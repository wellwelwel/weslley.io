import type { FC } from 'react';

export type SkillOptions = {
  src: string;
  key: string;
  name: string;
  alt?: string;
  className?: string;
};

const Skill: FC<SkillOptions> = ({ name, src, alt = name, key, className }) => {
  return (
    <>
      <button key={key} className={className} data-name={name}>
        <img loading='lazy' src={`/img/skills/${src}.svg`} alt={alt} />
      </button>
      <small>
        <img
          loading='lazy'
          src={`/img/skills/${src}.svg`}
          className={className}
          alt={alt}
        />{' '}
        {name}
      </small>
    </>
  );
};

export const skills = {
  nodejs: (key: string) => <Skill key={key} name='Node.js' src='nodejs' />,
  bun: (key: string) => <Skill key={key} name='Bun' src='bun' />,
  deno: (key: string) => <Skill key={key} name='Deno' src='deno' />,
  javascript: (key: string) => (
    <Skill key={key} name='JavaScript' src='javascript' />
  ),
  typescript: (key: string) => (
    <Skill key={key} name='TypeScript' src='typescript' />
  ),
  php: (key: string) => <Skill key={key} name='PHP' src='php' className='x' />,
  composer: (key: string) => <Skill key={key} name='Composer' src='composer' />,
  mysql: (key: string) => <Skill key={key} name='MySQL' src='mysql' />,
  apache: (key: string) => <Skill key={key} name='Apache' src='apache' />,
  bash: (key: string) => <Skill key={key} name='Bash' src='bash' />,
  aws: (key: string) => (
    <Skill
      key={key}
      name='Amazon Web Services (AWS)'
      src='aws'
      className='lg'
    />
  ),
  azure: (key: string) => (
    <Skill key={key} name='Azure' src='azure' className='sm' />
  ),
  azuresqlDatabase: (key: string) => (
    <Skill key={key} name='Azure SQL Database' src='azuresqldatabase' />
  ),
  github: (key: string) => <Skill key={key} name='GitHub' src='github' />,
  githubActions: (key: string) => (
    <Skill key={key} name='GitHub Actions' src='githubactions' />
  ),
  docker: (key: string) => (
    <Skill key={key} name='Docker' src='docker' className='x' />
  ),
  codecov: (key: string) => (
    <Skill key={key} name='Codecov' src='codecov' className='sm' />
  ),
  npm: (key: string) => <Skill key={key} name='npm' src='npm' className='x' />,
  react: (key: string) => <Skill key={key} name='React' src='react' />,
  sass: (key: string) => (
    <Skill key={key} name='Sass' src='sass' className='lg' />
  ),
  linux: (key: string) => <Skill key={key} name='Linux' src='linux' />,
  azureDevops: (key: string) => (
    <Skill key={key} name='Azure DevOps' src='azuredevops' />
  ),
  vscode: (key: string) => (
    <Skill key={key} name='Visual Studio Code' src='vscode' className='sm' />
  ),
};
