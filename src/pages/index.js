import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../lib/AlurakutCommons";
import { MainGrid } from "../components/MainGrid";
import { Box } from "../components/Box";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfileSidebar({ username }) {
  return (
    <Box>
      <img
        src={`https://github.com/${username}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${username}`}>
          @{username}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const username = "anishigouri";
  const [follwers, setFollwers] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const pessoasFavoritas = [
    "GustavoGottardi",
    "rafasluize",
    "peas",
    "gabrielSilvaN",
    "luisgottardi",
    "felipefialho",
  ];

  useEffect(() => {
    getSeguidores();
    getCommunities();
  }, []);

  async function getCommunities() {
    const response = await axios.post(
      "/api/comunidades",
      JSON.stringify({
        query: `query {
            allCommunities {
              title
              id
              imageUrl
              creatorSlug
            }
          }`,
      }),
      {
        headers: {
          Authorization: "224a310b0059728c337c967ada7fd5",
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );

    setComunidades(response);
  }

  async function getSeguidores() {
    const seguidores = await axios.get(
      "https://api.github.com/users/anishigouri/followers"
    );
    setFollwers(seguidores.data);
  }

  async function handleCriaComunidade(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const comunidade = {
      title: data.get("title"),
      imageUrl: data.get("image"),
      creatorSlug: username,
    };

    const response = await axios.post(
      "/api/comunidades",
      JSON.stringify(comunidade),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setComunidades([...comunidades, response.data]);
  }

  const ProfileRelationBox = ({ title, items }) => {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {title} ({follwers.length})
        </h2>
        <ul>
          {items.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.login}`} key={itemAtual.login}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
  };

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar username={username} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCriaComunidade}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationBox title="Seguidores" items={follwers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
