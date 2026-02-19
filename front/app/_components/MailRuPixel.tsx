"use client";

import Script from "next/script";
import { MAILRU_PIXEL_ID } from "../_lib/mailRuPixel";

const SCRIPT_ID = "tmr-code";

export function MailRuPixel() {
  return (
    <>
      <Script
        id="mailru-top-counter"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "${MAILRU_PIXEL_ID}", type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "${SCRIPT_ID}");
          `.trim(),
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://top-fwz1.mail.ru/counter?id=${MAILRU_PIXEL_ID};js=na`}
            style={{ position: "absolute", left: "-9999px" }}
            alt="Top.Mail.Ru"
          />
        </div>
      </noscript>
    </>
  );
}
