//https://fakeapi.platzi.com/en/rest/auth-jwt/

// https://api.escuelajs.co/api/v1/auth/login
// {
//     "email": "john@mail.com",
//     "password": "changeme"
//   }

function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      
      // Verifica se o accessToken está definido
      if (data.access_token) {

        const accessToken = data.access_token;

        // Armazene o token no localStorage
        localStorage.setItem('accessToken', accessToken);
  
        // Fazer outra solicitação para obter o PERFIL do usuário

        // {
        //   "id": 1,
        //   "email": "john@mail.com",
        //   "password": "changeme",
        //   "name": "Jhon",
        //   "role": "customer",
        //   "avatar": "https://i.imgur.com/LDOO4Qs.jpg",
        // }, 

        fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        .then(profileResponse => profileResponse.json())
        .then(profileData => {

          // Verifica se o nome do usuário está definido
          if (profileData.name) {

            // Armazene o nome do usuário no localStorage
            localStorage.setItem('userName', profileData.name);
          }
  
          // Redirecione para a pagina principal
          window.location.href = 'index.html';
        })
        .catch(profileError => {
          console.error('Erro ao obter o perfil do usuário:', profileError);
        });
      } else {

        // Se accessToken não estiver definido, mostra uma mensagem de erro
        alert('Usuário não encontrado. Verifique suas credenciais e tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro no login:', error);
    });
  }