import Script from 'next/script'

export default function GA4({ GOOGLE_TAG }: { GOOGLE_TAG: string }) {
    return (
        <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GOOGLE_TAG}');
                `,
        }}
      />
    </>
    );
  }