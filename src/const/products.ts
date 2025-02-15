//vestidos
import vestBlue from '../assets/vest-azul.jpeg';
import vestFloral from '../assets/vest_floral.jpeg';
import vestWhiteFront from '../assets/vest_branc_coladin.jpeg';
import vestDourado from '../assets/vest_dourado_curt.jpeg';
import vestChifon from '../assets/vest_chifon_lilas.jpeg';
import vestMidiVerao from '../assets/vest_midi_azul.jpeg';
import vestFloresMarfin from '../assets/vest_flores_marfin.jpeg';
import vestBrancoFloresRosa from '../assets/vest_branco_FLoresRosa.jpeg';
import vestEstampadoPreto from '../assets/vest_preto_azul.jpeg';

//conjuntos
import conjVerde from '../assets/conj_verde.jpeg';

//macaquinhos
import macaquinhoBranco from '../assets/macaquinho_branc.jpeg';
import macacaoFashion from '../assets/macacao.jpeg';

//calçados
import rasteiraPreta from '../assets/calçado/rastei_preta.jpeg';
import rasteiraBranca from '../assets/calçado/rastei_branca.jpeg';
import sandaliaRasteiraBranca from '../assets/calçado/sanda_rastei_branca.jpeg';

import beiraRioPreta from '../assets/calçado/calcado-beira_rio_preto.jpeg';
import beiraRioDourado from '../assets/calçado/calcado_beira_rio_dourado.jpeg';

import muleDourado from '../assets/calçado/mule_dourada.jpeg';
import mulePreta from '../assets/calçado/mule_preta.jpeg';

import sapaPedraria from '../assets/calçado/sap_predraria.jpeg';
import sapaJeans from '../assets/calçado/sap_jeans.jpeg';

//saltos
import saltoVilaRosa from '../assets/calçado/salto_vilaRosa.jpeg';

export const category = {vestido: 'Vestido', macaquinho: 'Macaquinho', calcado: 'Calçado', conjunto: 'Conjunto'};

let id = 0;

const generateId = () => {
    return `${id++}`;
};

export interface InterfaceProduct {
    id: string;
    name: string;
    photo: string;
    price: number;
    size: (number | string)[];
    category: string;
    amount: number;
  }

export const products : InterfaceProduct[] = [
    {
        id: generateId(),
        photo: vestBlue,
        name: 'Vestido longo verão',
        category: category.vestido,
        size: ['M-G'],
        amount:1,
        price: 155.00
    },
    {
        id: generateId(),
        photo: vestFloral,
        name: 'Vestido Primavera longo',
        category: category.vestido,
        size: ['M-G'],
        amount:1,
        price: 155.00
    },
    {
        id: generateId(),
        photo: vestWhiteFront,
        name: 'Vestido White',
        category: category.vestido,
        size: ['M-G'],
        amount:1,
        price: 100.00
    },
    {
        id: generateId(),
        photo: vestDourado,
        name: 'Vestido Festa Dourado',
        category: category.vestido,
        size: ['M-G'],
        amount:1,
        price: 85.00
    },
    {
        id: generateId(),
        photo: vestChifon,
        name: 'Vestido Chifon',
        category: category.vestido,
        size: ['G'],
        amount:1,
        price: 115.00
    },
    {
        id: generateId(),
        photo: macaquinhoBranco,
        name: 'Macaquinho Branco',
        category: category.macaquinho,
        size: ['P'],
        amount:1,
        price: 115.00
    },
    {
        id: generateId(),
        photo: macacaoFashion,
        name: 'Macacão Prince',
        category: category.macaquinho,
        size: ['M'],
        amount:2,
        price: 115.00
    },
    {
        id: generateId(),
        photo: conjVerde,
        name: 'Conjunto Verde',
        category: category.conjunto,
        size: ['M'],
        amount:1,
        price: 115.00
    },
    {
        id: generateId(),
        photo: vestMidiVerao,
        name: 'Vestido Midi Verão',
        category: category.vestido,
        size: ['M-G'],
        amount:1,
        price: 140.00
    },
    {
        id: generateId(),
        photo: vestFloresMarfin,
        name: 'Vestido Estampado',
        category: category.vestido,
        size: ['Único'],
        amount:2,
        price: 50
    },
    {
        id: generateId(),
        photo: vestBrancoFloresRosa,
        name: 'Vestido Branco Estampado',
        category: category.vestido,
        size: ['Único'],
        amount:2,
        price: 50
    },
    {
        id: generateId(),
        photo: vestEstampadoPreto,
        name: 'Vestido Preto Estampado',
        category: category.vestido,
        size: ['Único'],
        amount:2,
        price: 50
    },
    {
        id: generateId(),
        photo: muleDourado,
        name: 'Mule Beira Rio',
        category: category.calcado,
        size: ['36'],
        amount:1,
        price: 96.00
    },
    {
        id: generateId(),
        photo: mulePreta,
        name: 'Mule Beira Rio',
        category: category.calcado,
        size: ['35'],
        amount:1,
        price: 96.00
    },
    {
        id: generateId(),
        photo: rasteiraBranca,
        name: 'Rasteirinha',
        category: category.calcado,
        size: ['35'],
        amount:1,
        price: 79.00
    },
    {
        id: generateId(),
        photo: rasteiraPreta,
        name: 'Rasteirinha',
        category: category.calcado,
        size: ['38'],
        amount:1,
        price: 79.00
    },
    {
        id: generateId(),
        photo: sandaliaRasteiraBranca,
        name: 'Rasteirinha',
        category: category.calcado,
        size: ['36'],
        amount:2,
        price: 79.00
    },
    {
        id: generateId(),
        photo: sapaJeans,
        name: 'Sapatilha Jeans',
        category: category.calcado,
        size: ['37','40'],
        amount:1,
        price: 79.00
    },
    {
        id: generateId(),
        photo: sapaPedraria,
        name: 'Sapatilha',
        category: category.calcado,
        size: ['40'],
        amount:1,
        price: 79.00
    },
    {
        id: generateId(),
        photo: saltoVilaRosa,
        name: 'Salto VILAROSA',
        category: category.calcado,
        size: ['35','37'],
        amount:1,
        price: 124.00
    },
    {
        id: generateId(),
        photo: beiraRioDourado,
        name: 'Sandália Beira Rio',
        category: category.calcado,
        size: ['35','37'],
        amount:1,
        price: 79.00
    },
    {
        id: generateId(),
        photo: beiraRioPreta,
        name: 'Sandália Beira Rio',
        category: category.calcado,
        size: ['35'],
        amount:1,
        price: 79.00
    },
]