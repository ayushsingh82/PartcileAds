

import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import { mainnet, solana , defineChain } from '@particle-network/connectkit/chains';
import { evmWalletConnectors } from '@particle-network/connectkit/evm';
import { solanaWalletConnectors } from '@particle-network/connectkit/solana';
import { wallet, EntryPosition } from '@particle-network/connectkit/wallet';
import React from 'react';



// Retrieved from https://dashboard.particle.network
const projectId = "63b61ba3-a706-41e2-b16c-c45bacbb793b";
const clientKey ="c1MQa7KiUpsDPPgSbkfcJeDSmuQ8dqneyEBajBGk";
const appId = "sICpMVRuQqm11fEx82NbPmhr8tZY482V2U5gyTSO";
const walletConnectProjectId = "e7fa7d19fd057ecd9403a0e89bd62b8b";

if (!projectId || !clientKey || !appId) {
    throw new Error('Please configure the Particle project in .env first!');
}

const merlinTestnet = defineChain({
    id: 686868,
    name: 'Merlin Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Bitcoin',
        symbol: 'BTC',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.merlinchain.io'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://testnet-scan.merlinchain.io' },
    },
    testnet: true,
});

const config = createConfig({
    projectId,
    clientKey,
    appId,
    appearance: {
        // Optional, collection of properties to alter the appearance of the connection modal
        recommendedWallets: [
            { walletId: 'metaMask', label: 'Recommended' },
            { walletId: 'coinbaseWallet', label: 'Popular' },
        ],
        splitEmailAndPhone: false,
        collapseWalletList: false,
        hideContinueButton: false,
        connectorsOrder: ['email', 'phone', 'social', 'wallet'],
        language: 'en-US',
        mode: 'light',
        theme: {
            '--pcm-accent-color': '#ff4d4f',
            // ... other options
        },
        logo: 'https://...',
        filterCountryCallingCode: (countries) => {
            return countries.filter((item) => item === 'US');
        },
    },
    walletConnectors: [
        evmWalletConnectors({
            metadata: { name: 'My App', icon: '', description: '', url: '' },
            walletConnectProjectId: walletConnectProjectId || '', // Optional, use project ID from env
        }),
        authWalletConnectors({
            authTypes: ['email', 'google', 'apple', 'twitter', 'github'],
            fiatCoin: 'USD',
            promptSettingConfig: {
                promptMasterPasswordSettingWhenLogin: 1,
                promptPaymentPasswordSettingWhenSign: 1,
            },
        }),
        solanaWalletConnectors(),
    ],
    plugins: [
        wallet({
            entryPosition: EntryPosition.BR,
            visible: true,
        }),
    ],
    chains: [mainnet, solana,merlinTestnet],
});

export const ParticleConnectkit = ({ children }) => {
    return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};