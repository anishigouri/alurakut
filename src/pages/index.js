import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons';
import {MainGrid} from '../components/MainGrid';
import {Box} from '../components/Box';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';

function ProfileSidebar({username}) {
  return (
    <Box>
      <img src={`https://github.com/${username}.png`} style={{borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {

  const username = 'anishigouri';

  const pessoasFavoritas = [
    'GustavoGottardi',
    'rafasluize',
    'peas',
    'gabrielSilvaN',
    'luisgottardi',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar username={username} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
