import { Signal, signal } from '@preact/signals-react';

class PwrProviderNotDetectedError extends Error {
	constructor() {
		super();
		this.message = 'PWR provider not detected';
		this.code = 'PWR_PROVIDER_NOT_DETECTED';
	}
}

export default class PwrService {
	// state
	constructor() {
		this.initialized = signal(false);
		this.detected = signal(false);
		this.connected = signal(false);

		// wallet
		this.address = signal('');
		this.provider = null;
	}

	// initialize the service
	async init() {
		// 1. detect provider
		// 2. get provider

		// this small delay is needed to make sure that wallet can be initialized
		await new Promise((resolve) => setTimeout(resolve, 200));

		this.detectProvider();

		// *~~~ Events ~~~* //

		if (this.provider) {
			const isConnected = await this.provider.isConnected();

			if (isConnected) {
				const address = await this.provider.restablishConnection();

				this.connected.value = true;
				this.address.value = address;
			}

			this.provider.onConnect.addListener((address) => {
				this.connected.value = true;
				this.address.value = address;
			});

			this.provider.onDisconnect.addListener(() => {
				this.connected.value = false;
				this.address.value = '';
			});
		}

		this.initialized.value = true;
	}

	// *~~~ External connection ~~~* //
	detectProvider() {
		if (window.pwr) {
			this.detected.value = true;
			this.provider = window.pwr;
		} else {
			this.detected.value = false;
		}
	}

	getProvider() {
		if (!this.detected.value) throw new PwrProviderNotDetectedError();

		return this.provider;
	}

	async connect() {
		if (!this.provider) throw new PwrProviderNotDetectedError();

		return this.provider.connect();
	}

	async transferPwr(to, amount) {
		if (!this.provider) throw new PwrProviderNotDetectedError();
		if (!this.connected.value) throw new Error('Wallet is not connected');

		await this.provider.transferPwr({ to, amount });
	}

	// *~~~ API ~~~* //
	isConnected() {
		return this.connected.value;
	}

	getAddress() {
		return this.address.value;
	}
}
