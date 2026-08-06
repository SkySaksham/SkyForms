class GoogleAuth {
  constructor(clientId) {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: this.#handleCredentialResponse.bind(this),
    });
  }

  renderButton(elementId, options = {}) {
    google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: "light",
        size: "large",
        text: "signin_with",
        shape: "pill",
        ...options,
      }
    );
  }


  async #handleCredentialResponse(response) {
      const jwt = response.credential;
      console.log(jwt);

      const res = await fetch("http://127.0.0.1:8000/auth/signin",{
          method : "POST",
          headers : {"Content-Type": "application/json"},
          body : JSON.stringify({"id_token":jwt}),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      } 
      const data = await res.json();
      console.log(data);
  }
}

export const googleAuth = new GoogleAuth(
  "1033030768271-ghkd1a40lbl5jdv3mrrbkbb4bak3j271.apps.googleusercontent.com"
);