export const fallbackTestimonials = [
  {
    name: "Ana Paula",
    city: "Recife - PE",
    message:
      "Eu cheguei no fundo do poço emocional. Esse livro me fez respirar de novo e acreditar que Deus ainda escrevia meu capítulo.",
  },
  {
    name: "João Victor",
    city: "Campinas - SP",
    message:
      "Eu lia e sentia como se o cheiro da poeira e da promessa entrasse no quarto. Foi impossível terminar igual comecei.",
  },
  {
    name: "Cíntia Ramos",
    city: "Belém - PA",
    message:
      "Sozoano me lembrou: quem Deus chama não é o mais óbvio, é o disponível. Chorei, ri e me reconciliei com meu propósito.",
  },
];

export type FallbackProduct = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  checkoutUrl?: string;
};

const POLO_MASC_SIZES = ["P", "M", "G", "GG", "XG", "XGG"];
const POLO_FEM_SIZES = ["P", "M", "G", "GG", "XG"];
const TEE_MASC_SIZES = ["P", "M", "G", "GG", "XG"];
const TEE_FEM_SIZES = ["P", "M", "G", "GG"];

export const fallbackProducts: FallbackProduct[] = [
  // ------------------------------------------------------ Polos masculinas
  {
    slug: "polo-masculina-classica",
    title: "Polo Clássica",
    description:
      "Polo piquet premium azul-marinho com frisos dourados e a inscrição 'Proveniente de Cristo' nas costas. Bordado de alta definição, não desbota.",
    price: 129.9,
    image: "/images/produtos/polo-masculina-classica.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Azul-marinho"],
  },
  {
    slug: "polo-masculina-premium",
    title: "Polo Premium",
    description:
      "Polo piquet premium branca com coroa bordada e 'Fé · Graça · Propósito' nas costas. Elegância para todos os momentos.",
    price: 139.9,
    image: "/images/produtos/polo-masculina-premium.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Branco"],
  },
  {
    slug: "polo-masculina-confort",
    title: "Polo Confort",
    description:
      "Polo preta com gola caramelo e conforto térmico. 'Transformado' bordado nas costas — para quem carrega a mudança por dentro e por fora.",
    price: 139.9,
    image: "/images/produtos/polo-masculina-confort.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Preto"],
  },
  {
    slug: "polo-masculina-essencia",
    title: "Polo Essência",
    description:
      "Polo azul com lettering vertical SOZOANO nas costas. Piquet premium que não desbota, essência em cada detalhe.",
    price: 129.9,
    image: "/images/produtos/polo-masculina-essencia.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Azul"],
  },
  {
    slug: "polo-masculina-raizes",
    title: "Polo Raízes",
    description:
      "Polo verde-oliva com a árvore da vida bordada em dourado e 'Enraizado em Cristo' nas costas. Bordado de alta definição.",
    price: 149.9,
    image: "/images/produtos/polo-masculina-raizes.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Verde-oliva"],
  },
  {
    slug: "polo-masculina-performance",
    title: "Polo Performance",
    description:
      "Polo cinza mescla em tecido Dry Fit com conforto térmico. Para treinar, trabalhar e viver o propósito em movimento.",
    price: 139.9,
    image: "/images/produtos/polo-masculina-performance.jpg",
    category: "polo",
    sizes: POLO_MASC_SIZES,
    colors: ["Cinza mescla"],
  },

  // ------------------------------------------------------ Polos femininas
  {
    slug: "polo-feminina-classica",
    title: "Polo Feminina Clássica",
    description:
      "Polo piquet premium rosa com coroa e 'Proveniente de Cristo' nas costas. Caimento feminino, conforto o dia inteiro.",
    price: 129.9,
    image: "/images/produtos/polo-feminina-classica.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Rosa"],
  },
  {
    slug: "polo-feminina-delicada",
    title: "Polo Feminina Delicada",
    description:
      "Polo branca com detalhes rosé e 'Fé · Graça · Propósito' nas costas. Delicadeza que comunica identidade.",
    price: 129.9,
    image: "/images/produtos/polo-feminina-delicada.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Branco"],
  },
  {
    slug: "polo-feminina-elegancia",
    title: "Polo Feminina Elegância",
    description:
      "Polo preta com frisos dourados e 'Escolhida e Amada' bordado nas costas. Sofisticação com mensagem.",
    price: 139.9,
    image: "/images/produtos/polo-feminina-elegancia.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Preto"],
  },
  {
    slug: "polo-feminina-essencia",
    title: "Polo Feminina Essência",
    description:
      "Polo lilás com lettering vertical SOZOANO nas costas. Piquet premium, leveza e essência.",
    price: 129.9,
    image: "/images/produtos/polo-feminina-essencia.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Lilás"],
  },
  {
    slug: "polo-feminina-floral",
    title: "Polo Feminina Floral",
    description:
      "Polo off-white com acabamentos florais e 'Gerada para Frutificar' nas costas. A peça mais delicada da coleção.",
    price: 149.9,
    image: "/images/produtos/polo-feminina-floral.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Off-white floral"],
  },
  {
    slug: "polo-feminina-sport",
    title: "Polo Feminina Sport",
    description:
      "Polo azul-marinho com frisos rosa em tecido com conforto térmico. Esportiva sem perder a identidade.",
    price: 139.9,
    image: "/images/produtos/polo-feminina-sport.jpg",
    category: "polo",
    sizes: POLO_FEM_SIZES,
    colors: ["Azul-marinho"],
  },

  // ------------------------------------------------------ Camisetas masculinas
  {
    slug: "camiseta-classica",
    title: "Camiseta Clássica",
    description:
      "Camiseta azul-marinho em algodão premium com 'Proveniente de Cristo' na frente e cruz dourada nas costas. Estampa de alta qualidade que não desbota.",
    price: 79.9,
    image: "/images/produtos/camiseta-classica.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Azul-marinho"],
  },
  {
    slug: "camiseta-fe-que-transforma",
    title: "Camiseta Fé que Transforma",
    description:
      "Camiseta preta em algodão premium com estampa dourada 'Fé que Transforma' e lettering vertical nas costas.",
    price: 79.9,
    image: "/images/produtos/camiseta-fe-que-transforma.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Preto"],
  },
  {
    slug: "camiseta-essencia",
    title: "Camiseta Essência",
    description:
      "Camiseta branca em algodão premium com 'Essência do Reino' na frente e coroa nas costas. O básico com propósito.",
    price: 79.9,
    image: "/images/produtos/camiseta-essencia.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Branco"],
  },
  {
    slug: "camiseta-minimalista",
    title: "Camiseta Minimalista",
    description:
      "Camiseta bege em algodão premium com logo discreto no peito e lettering vertical nas costas. Para quem fala baixo e vive alto.",
    price: 79.9,
    image: "/images/produtos/camiseta-minimalista.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Bege"],
  },
  {
    slug: "camiseta-performance",
    title: "Camiseta Performance",
    description:
      "Camiseta azul-marinho em tecido Dry Fit com 'Força · Fé · Foco'. Feita para o movimento.",
    price: 89.9,
    image: "/images/produtos/camiseta-performance.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Azul-marinho"],
  },
  {
    slug: "camiseta-degrade",
    title: "Camiseta Degradê",
    description:
      "Camiseta com degradê exclusivo do preto ao branco e lettering dourado vertical nas costas. Malha fria de alto conforto.",
    price: 89.9,
    image: "/images/produtos/camiseta-degrade.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Degradê preto/branco"],
  },
  {
    slug: "camiseta-raizes",
    title: "Camiseta Raízes",
    description:
      "Camiseta verde-oliva em algodão premium com a árvore e suas raízes estampadas. Enraizado no que não se vê.",
    price: 89.9,
    image: "/images/produtos/camiseta-raizes.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Verde-oliva"],
  },
  {
    slug: "camiseta-street",
    title: "Camiseta Street",
    description:
      "Camiseta preta oversized com lettering estilo grafite e coroa dourada nas costas. Streetwear com mensagem de Reino.",
    price: 99.9,
    image: "/images/produtos/camiseta-street.jpg",
    category: "camiseta",
    sizes: TEE_MASC_SIZES,
    colors: ["Preto"],
  },

  // ------------------------------------------------------ Camisetas femininas
  {
    slug: "camiseta-feminina-classica",
    title: "Camiseta Feminina Clássica",
    description:
      "Camiseta rosa em algodão premium com 'Proveniente de Cristo' na frente e coração nas costas. Caimento feminino.",
    price: 79.9,
    image: "/images/produtos/camiseta-feminina-classica.jpg",
    category: "camiseta",
    sizes: TEE_FEM_SIZES,
    colors: ["Rosa"],
  },
  {
    slug: "camiseta-feminina-delicada",
    title: "Camiseta Feminina Delicada",
    description:
      "Camiseta off-white com lettering manuscrito e 'amada · escolhida · guardada' nas costas. Malha fria, toque suave.",
    price: 79.9,
    image: "/images/produtos/camiseta-feminina-delicada.jpg",
    category: "camiseta",
    sizes: TEE_FEM_SIZES,
    colors: ["Off-white"],
  },
  {
    slug: "camiseta-feminina-essencia",
    title: "Camiseta Feminina Essência",
    description:
      "Camiseta lilás em algodão premium com 'Essência do Reino' na frente e coroa nas costas.",
    price: 79.9,
    image: "/images/produtos/camiseta-feminina-essencia.jpg",
    category: "camiseta",
    sizes: TEE_FEM_SIZES,
    colors: ["Lilás"],
  },
  {
    slug: "camiseta-feminina-floral",
    title: "Camiseta Feminina Floral",
    description:
      "Camiseta branca com estampa floral e 'Floresço em Cristo' manuscrito nas costas. A queridinha da coleção.",
    price: 89.9,
    image: "/images/produtos/camiseta-feminina-floral.jpg",
    category: "camiseta",
    sizes: TEE_FEM_SIZES,
    colors: ["Branco floral"],
  },
];

export const fallbackCharacters = [
  {
    slug: "moises",
    name: "Moisés",
    title: "A voz na sarça ardente",
    summary: "Quando a insegurança queimou, o chamado permaneceu.",
    chapter: 2,
    symbol: "Sarça ardente",
    lesson: "Deus não escolhe o mais eloquente, escolhe quem decide obedecer.",
    sensoryNarrative:
      "O vento quente do deserto arranhava a pele. A areia subia em redemoinhos baixos e, no silêncio, uma chama viva dançava sem consumir os galhos. O cheiro era de terra, fumaça leve e promessa. Moisés sentiu os joelhos fraquejarem, porque aquele fogo não era destruição, era direção.",
  },
  {
    slug: "gideao",
    name: "Gideão",
    title: "Do medo para a coragem",
    summary: "Mesmo escondido, ele foi encontrado pelo céu.",
    chapter: 3,
    symbol: "Velo molhado",
    lesson: "Quando Deus confirma, até o medo aprende a marchar.",
    sensoryNarrative:
      "A madrugada chegava fria, e o chão cheirava a trigo recém-batido. Gideão apertou o velo com as mãos trêmulas e viu a água escorrer entre os dedos. O coração acelerou como trovão no peito. Naquela noite, o improvável deixou de ser desculpa e virou destino.",
  },
  {
    slug: "davi",
    name: "Davi",
    title: "Cinco pedras e uma convicção",
    summary: "No vale, a fé acertou antes da funda.",
    chapter: 4,
    symbol: "Funda de pastor",
    lesson: "Quem carrega aliança não negocia com gigantes.",
    sensoryNarrative:
      "O ar tinha gosto metálico de guerra, e cada passo no vale levantava pó sobre as sandálias. Davi sentiu o couro da funda nas mãos, áspero e conhecido, como oração repetida por anos. O silêncio antes do lançamento pareceu eterno. Quando a pedra voou, foi como se a esperança rasgasse o céu.",
  },
  {
    slug: "rute",
    name: "Rute",
    title: "Fidelidade que abre campos",
    summary: "Onde faltava futuro, Deus semeou recomeço.",
    chapter: 5,
    symbol: "Espigas no campo",
    lesson: "Lealdade em tempos duros sempre encontra redenção.",
    sensoryNarrative:
      "O sol da tarde queimava os ombros e o cheiro de cereal maduro enchia o ar. Rute recolhia espigas em silêncio, ouvindo apenas o farfalhar da plantação. Cada grão era pequeno, mas carregava um amanhã inteiro. Deus estava costurando linhagem no meio da rotina.",
  },
  {
    slug: "zaqueu",
    name: "Zaqueu",
    title: "Quando Jesus chama pelo nome",
    summary: "A curiosidade subiu na árvore; a salvação desceu para casa.",
    chapter: 6,
    symbol: "Sicômoro",
    lesson: "O encontro com Cristo redefine identidade e caminho.",
    sensoryNarrative:
      "A multidão empurrava, o calor era denso e o cheiro de rua subia com poeira e suor. No alto da árvore, Zaqueu respirava curto tentando enxergar. Então veio a voz, firme e afetuosa, atravessando o barulho da cidade. Naquele segundo, ele percebeu que Deus o via por inteiro.",
  },
  {
    slug: "maria-mae-de-jesus",
    name: "Maria",
    title: "A mãe de Jesus",
    summary: "Em Nazaré, uma jovem simples recebe um chamado que atravessa a história.",
    chapter: 7,
    symbol: "Nazaré",
    lesson: "A coragem silenciosa da obediência pode carregar promessas eternas.",
    sensoryNarrative:
      "Maria vivia em Nazaré, entre a simplicidade da rotina e as expectativas de sua época. Em meio ao cheiro de pão assando e à luz suave da manhã, sua história toma um rumo improvável: uma jovem comum, em um tempo de opressão, chamada para participar de algo maior que ela mesma.",
  },
  {
    slug: "paulo",
    name: "Paulo",
    title: "O Perseguidor Convertido",
    summary: "No meio do caminho, a luz interrompeu a fúria e reescreveu a missão.",
    chapter: 8,
    symbol: "Estrada de Damasco",
    lesson: "Nenhuma convicção errada resiste a um encontro verdadeiro com a graça.",
    sensoryNarrative:
      "A poeira da estrada subia com o trote das montarias, e Saulo apertava as cartas de autorização como quem carrega uma sentença. Então o meio-dia rasgou-se em luz. O chão veio de encontro aos joelhos, os olhos arderam até escurecer, e no silêncio ensurdecedor uma voz chamou pelo nome. Ali, entre a cegueira e a verdade, o perseguidor começou a virar apóstolo.",
  },
  {
    slug: "ester",
    name: "Ester",
    title: "A Rainha Corajosa",
    summary: "Uma órfã exilada posicionada por Deus para salvar um povo inteiro.",
    chapter: 9,
    symbol: "Cetro estendido",
    lesson: "Talvez seja exatamente para uma hora como esta que você chegou até aqui.",
    sensoryNarrative:
      "O salão do palácio cheirava a mirra e a poder. Cada passo de Ester ecoava no mármore como um tambor de guerra silencioso: aproximar-se do rei sem ser chamada era pedir a morte. Ela respirou fundo, sentiu o peso da coroa e o peso maior do seu povo, e avançou. Quando o cetro de ouro se estendeu na direção dela, o improvável virou livramento.",
  },
  {
    slug: "pedro",
    name: "Pedro",
    title: "O Discípulo Imperfeito",
    summary: "Entre quedas e recomeços, um pescador aprendeu a firmar os pés na fé.",
    chapter: 10,
    symbol: "Rede e mar aberto",
    lesson: "Deus não desiste de quem cai; Ele restaura quem se levanta e volta a amar.",
    sensoryNarrative:
      "O cheiro de sal e peixe morava nas mãos calejadas de Pedro. Ele conhecia o humor do mar, mas nada o preparou para andar sobre ele — nem para afundar, nem para o galo cortar a madrugada depois da negação. Na praia, sobre brasas e pão, a pergunta veio três vezes: 'Tu me amas?'. E três vezes o perdão reconstruiu o que o medo havia quebrado.",
  },
  {
    slug: "mulheres-no-ministerio",
    name: "As Mulheres no Ministério",
    title: "Força que abre caminhos",
    summary: "Das matriarcas às discípulas, a presença feminina sustentou a história da fé.",
    chapter: 11,
    symbol: "Vaso de alabastro",
    lesson: "Vocação não tem gênero: tem entrega, coragem e legado.",
    sensoryNarrative:
      "O perfume do nardo derramado encheu a casa e atravessou os séculos. Débora julgou debaixo da palmeira, Rute recolheu espigas, Maria guardou promessas no coração, e as mulheres foram as primeiras a anunciar o túmulo vazio. Em cada gesto — um vaso quebrado, um caminho aberto, uma madrugada de coragem — Deus escreveu capítulos que ninguém esperava.",
  },
];
