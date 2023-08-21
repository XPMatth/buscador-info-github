const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
            this.userProfile.innerHTML = `<div class="info">
                              <img src="${user.avatarUrl}" alt="Foto de perfil do usuario"/>
                        <div class="data">
                          <h1>${user.name ?? 'Não possui nome cadastrado 😒'}</h1>
                          <h3>${'Seguidores'}</h3>
                          <h4>${user.follower}</h4> 
                          <h3>${'Seguindo'}</h3>
                          <h4>${user.following}</h4>  

                          <p>${user.bio ?? 'Não possui bio cadastrada 😒'}</p>
                        </div>
                            </div>`


                            let repositoriesItens = ""

                            user.repositories.forEach(repo =>{
                                repositoriesItens += `<li>
                                <a href="${repo.html_url}" target="_blank">${repo.name} <br>

                                <div class="repo-info">

                                <p><i class="fas fa-code-branch"></i>  ${repo.forks}</p>
                                <p><i class="fas fa-star"></i> ${repo.stargazers_count}</p>
                                <p><i class="fas fa-eye"></i> ${repo.watchers_count}<p>
                                <p><i class="fas fa-laptop-code"></i> ${repo.language ?? 'Sem info'}<p>
                              </div>
                                </a>
                                  </li>`
                            })

                            if(user.repositories.length > 0){
                                this.userProfile.innerHTML += `<div class="repositories section">
                                <h2>Repositórios</h2>
                                <ul>${repositoriesItens}</ul>
                              </div>`             
                            }

                            
                            let eventsItens = ""

                            user.events.forEach(events => {


                              if (events.type === 'CreateEvent'){
                                eventsItens += `<p class="nome-event><strong>${events.repo.name}</strong> - Create: ${events.payload.ref_type}</p>`

                              } else if(events.type === 'PushEvent'){
                                eventsItens += `<p class="nome-event"><strong>${events.repo.name}</strong> - ${events.payload.commits[0].message ?? 'Não definida'}</p>`

                              } else (!events.type === "CreateEvent" || !events.type === "PushEvent")
                              {
                                  return
                              }
                            })

                            if(user.events.length > 0){
                              
                            this.userProfile.innerHTML += `<div class="itens-event">
                            <h2>Eventos</h2>
                            <ul>${eventsItens}</ul>
                            </div>`
                            } 


    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }