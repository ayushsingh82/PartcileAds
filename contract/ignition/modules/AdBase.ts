import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const ORG_ADD = "0x72d2F62A93305752CC57D48Ea217CA687EA43dc0";
const AdBaseModule = buildModule("AdBaseModule", (m) => {
  const org_add = m.getParameter("orgAdd", ORG_ADD);
  const verifier = m.contract("PlonkVerifier");
  const adbase = m.contract("AdBase", [org_add, verifier]);

  return { adbase };
});

export default AdBaseModule;
