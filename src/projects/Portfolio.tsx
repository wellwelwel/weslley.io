import { Heart } from 'lucide-react';
import { Project } from '../components/Project';

export const Portfolio = () => (
  <Project
    name='Esse site aqui (esse mesmo)'
    organization='wellwelwel'
    repository='weslley.io'
    license='AGPL-3.0'
    icon={<Heart />}
  >
    <p>
      👨🏻‍🎨 Já viu aquele portfólio dahora, mas não tem ideia de como o programador
      fez? Meu portfólio é <em>open-source</em> e você pode não só olhar, como
      criar um <em>fork</em> e adaptar para usar no seu próprio portfólio.
    </p>
    <p>
      Ele também serve como uma amostra da minha atuação no <em>frontend</em>,
      visto que a maioria dos meus projetos são focados no <em>backend</em>.
    </p>
  </Project>
);
