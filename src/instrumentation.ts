import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/realtime-js";

globalThis.TAGS = globalThis.TAGS || []
let channel: RealtimeChannel

export async function register() {
  const supabase = createClient();

  // Fetch tags from Supabase when the server starts
  const { data, error } = await supabase.from('tags').select('tag');
  if (error) {
    console.error("Error fetching tags:", error);
  } else {
    globalThis.TAGS = data!.map(tag => tag.tag);
  }

  channel = supabase
                  .channel('realtime_tags')
                  .on(
                    'postgres_changes',
                    {
                    event: 'INSERT',
                    schema: 'public'
                    },
                    (payload) => {
                      const newTag = payload.new.tag
                      if(!globalThis.TAGS.includes(newTag)) {
                        globalThis.TAGS.push(newTag)
                      }
                    }
                ).subscribe()
  if (typeof process !== "undefined" && process.on) {
    // Unsubscribe when the server stops
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  }
    
}

export function getTags() {
  return TAGS;
}

function cleanup() {
  if (channel) {
    channel.unsubscribe().then(() => {
      process.exit(0); // Ensure the process exits after cleanup
    }).catch((error) => {
      process.exit(1);
    });
  } else {
    process.exit(0);
  }
}