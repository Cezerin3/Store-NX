class AjaxLogin {
	client: any;
	constructor(client) {
		this.client = client;
	}

	retrieve(data) {
		return this.client.post(`/login`, data);
	}
}

export default AjaxLogin