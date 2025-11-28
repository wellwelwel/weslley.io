import type { FC } from 'react';

export type SkillOptions = {
  src: string;
  name: string;
  alt?: string;
  className?: string;
};

const Skill: FC<SkillOptions> = ({ name, src, alt = name, className }) => {
  return (
    <>
      <button className={className} data-name={name}>
        <img
          loading='lazy'
          decoding='async'
          src={`/img/skills/${src}.svg`}
          alt={alt}
        />
      </button>
      <small>
        <img
          loading='lazy'
          decoding='async'
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
  nodejs: () => <Skill name='Node.js' src='nodejs' />,
  bun: () => <Skill name='Bun' src='bun' />,
  deno: () => <Skill name='Deno' src='deno' />,
  javascript: () => <Skill name='JavaScript' src='javascript' />,
  typescript: () => <Skill name='TypeScript' src='typescript' />,
  php: () => <Skill name='PHP' src='php' className='x' />,
  composer: () => <Skill name='Composer' src='composer' />,
  mysql: () => <Skill name='MySQL' src='mysql' />,
  apache: () => <Skill name='Apache' src='apache' />,
  bash: () => <Skill name='Bash' src='bash' />,
  aws: () => (
    <Skill name='Amazon Web Services (AWS)' src='aws' className='lg' />
  ),
  azure: () => <Skill name='Azure' src='azure' className='sm' />,
  azuresqlDatabase: () => (
    <Skill name='Azure SQL Database' src='azuresqldatabase' />
  ),
  github: () => <Skill name='GitHub' src='github' />,
  githubActions: () => <Skill name='GitHub Actions' src='githubactions' />,
  docker: () => <Skill name='Docker' src='docker' className='x' />,
  codecov: () => <Skill name='Codecov' src='codecov' className='sm' />,
  npm: () => <Skill name='npm' src='npm' className='x' />,
  react: () => <Skill name='React' src='react' />,
  sass: () => <Skill name='Sass' src='sass' className='lg' />,
  linux: () => <Skill name='Linux' src='linux' />,
  azureDevops: () => <Skill name='Azure DevOps' src='azuredevops' />,
  docusaurus: () => <Skill name='Docusaurus' src='docusaurus' className='sm' />,
  mdx: () => <Skill name='MDX' src='mdx' className='sm-x' />,
  algolia: () => <Skill name='Algolia' src='algolia' className='sm' />,
  cloudflare: () => <Skill name='Cloudflare' src='cloudflare' className='x' />,
  cloudflareworkers: () => (
    <Skill name='Cloudflare Workers' src='cloudflareworkers' />
  ),
  vscode: () => <Skill name='Visual Studio Code' src='vscode' className='sm' />,
};
