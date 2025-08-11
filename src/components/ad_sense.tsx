// import React, { useEffect } from "react";

// const Adsense = ({ adClient, adSlot, adFormat }) => {
//   useEffect(() => {
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//   }, []);

//   return (
//     <ins
//       className="adsbygoogle"
//       style={{ display: "block" }}
//       data-ad-client={adClient}
//       data-ad-slot={adSlot}
//       data-ad-format={adFormat}
//     ></ins>
//   );
// };

// export default Adsense;
// useEffect(() => {
//   const script = document.createElement("script");
//   script.src =
//     "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx";
//   script.async = true;
//   script.crossOrigin = "anonymous";
//   document.head.appendChild(script);
//   return () => {
//     document.head.removeChild(script);
//   };
// }, []);