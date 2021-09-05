export const colors = {
    vio: '#7B61FF',
    blck: '#212221',
    orng: '#FEBF60',
    rd: '#FA9FA8',
    wht: '#fff',
    lght: '#F6F6F6',
    lgr: '#DADCDE',
    gry: '#B4B6B8',
    grn: '#27AE60',
    drd: '#EB5757',
    prpl: '#7B61FF',
    free: '#00CA99',
    busy: '#FE7060',
    ylw: '#FEBF60',
};

const base = process.env.NEXT_PUBLIC_BASE_API || 'https://admin-hack.techno-team.ru';

export const urls = {
    base: `${base}/`,
    gql: `${base}/graphql/`,
    system: `${base}/graphql/system/`,
    assets: `${base}/assets/`,
};
