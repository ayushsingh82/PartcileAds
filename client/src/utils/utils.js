const backendUrl = "https://api-testing.publicvm.com";

async function getCampaigns() {
  const res = await fetch(`${backendUrl}\campaigns`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  let campaigns = await res.json();
  return campaigns;
}

async function addCampaign(
  campaignId,
  creator,
  ads,
  redirectUrl,
  campaignName,
  region,
  spending_limit
) {
  const res = await fetch(`${backendUrl}\campaigns`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      campaignId,
      creator,
      ads,
      redirectUrl,
      campaignName,
      region,
      spending_limit,
    }),
  });
  if (res.status == 201) {
    return true;
  }
  return false;
}
