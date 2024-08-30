import React, { useEffect, useState } from "react";
const backendUrl = "https://api-testing.publicvm.com";
import { useAdContext } from "./AdWrapper";
const checkContentType = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return contentType;
  } catch (error) {
    console.error("Error fetching the content type:", error);
  }
};

const DisplayAd = ({ width, height }: { width: number; height: number }) => {
  const [ad, setAd] = useState<{
    ad: string;
    redirectUrl: string;
    contenttype: string | undefined;
  } | null>(null);

  const { dev_wallet_address } = useAdContext();

  useEffect(() => {
    const getAd = async () => {
      const res = await fetch(`${backendUrl}/randomAd`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      const ad_data = await res.json();
      const contenttype = await checkContentType(ad_data.ad);
      setAd({
        ...ad_data,
        contenttype,
      });
    };

    if (!ad) {
      getAd();
    }
  }, [ad]);
  const handleAdClick = async () => {
    await fetch(`${backendUrl}/dev/${dev_wallet_address}/adclick`, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
    });
    window.location.href = ad!.redirectUrl;
  };
  return (
    <div>
      {" "}
      {ad ? (
        <div onClick={handleAdClick}>
          {" "}
          {ad.contenttype?.startsWith("image/") ? (
            <img src={ad.ad} alt="Ad" width={width} height={height} />
          ) : (
            <>
              {ad.contenttype?.startsWith("video/") ? (
                <video width={width} height={height} autoPlay muted loop>
                  <source src={ad.ad} type="video/mp4" />
                  Type Not supported
                </video>
              ) : (
                <>Unspported Type</>
              )}
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DisplayAd;
