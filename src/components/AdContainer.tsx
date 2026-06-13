export default function AdContainer({ slot, format = "auto" }: { slot: string; format?: string }) {
  // This component renders the AdSense placeholder.
  // AdSense auto-ads are configured in layout.tsx.
  // Individual ad slots can be added here when AdSense is approved.
  return (
    <div className="ad-container no-print" role="complementary" aria-label="Advertisement">
      <div className="text-xs text-gray-400 uppercase tracking-wider">Advertisement</div>
      {/* 
        When AdSense is approved, uncomment:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
}
