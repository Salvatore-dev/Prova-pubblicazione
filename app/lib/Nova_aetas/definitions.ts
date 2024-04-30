export type Hero = {
    id: number,
    name: string,
    players: string,
    class: string,
    liaison: string | null,
    note: string | null,
    destiny: number,
    spent: number | null,
    earned: number | null,
    hero_conquests: string,
    hero_strengthenings: string,
    campaign_id: number | null
}
export enum Case_modify_Hero {
    name = 'name',
    players = 'players',
    class = 'class',
    liaison = 'liaison',
    note = 'note',
    destiny = 'destiny',
    spent = 'spent',
    earned = 'earned',
    conquests = 'hero_conquests',
    strengthenings =  'hero_strengthenings',
  }

export type Injury = {
    id: number,
    name: string,
    popolini: number| null,
    hero_id: number
}
export type Skill ={
    id: number,
    name: string,
    experience: number,
    hero_id: number
}
// export type Upgrades ={
//     id: number,
//     name: string,
//     icon: string,
//     value: boolean,
//     hero_id: number

// }
export interface HERO extends Hero {
    injuries: Injury[] | null,
    skills: Skill[] | null,
    //upgrades: Upgrades[] | null
}


export enum Missions_type {
    campaign = 'Campagna',
    hunt = 'Caccia',
    encounter = 'Incontro',
    exploration = 'Esplorazione'
}

export type Item_treasury = {
    id?: number | null,
    name : string,
    icon: Icon_treasury,
    purchase?: number,
    sale?: number,
    quantity : number,
    campaign_id? : number;

}
export enum Action_Type_Skills {
    name = 'name',
    experience = 'experience'
}
export enum Action_Type_Injuries {
    name = 'name',
    popolini = 'popolini'
}
export enum Icon_treasury {
    elementum = 'elementum',
    alchimia = 'alchimia',
    pecunia =  'pecunia',
    popolino  = 'popolino'
}
export type Result_campaign = {
    name: string | null,
    campaign_id: number | null,
    inventory_id: number | null,
    inventory_item_name: string | null,
    conquest: string | null,
    conquest_id: number | null,
    treasury_id: number | null,
    treasury_name: string | null,
    treasury_icon: string | null,
    treasury_purchase: number | null,
    treasury_sale: number | null,
    treasury_quantity: number | null,
    mission_id: number,
    mission_name: string,
    mission_type: string | null,
    mission_detail: string | null,
    mission_complete: boolean | null
}

export type Campaign = {
    name: string | null,
    campaign_id: number | null,
}
export type Inventory = {
    id: number,
    name: string,
    campaign_id: number,
}
export type Conquest = {
    id: number,
    No: string,
    campaign_id: number,
}

export type Treasury = {
    id: number | null,
    name: string | null,
    campaign_id: number | null,
    quantity: number,
    puchase: number | null,
    sale: number | null,
    icon: string | null
}
export type Mission = {
    id: number,
    name: string,
    campaign_id: number,
    type: string,
    detail: string,
    complete: boolean
}
export type Campaign_data = {
    campaign: Campaign | null,
    inventory: Inventory[] | null,
    treasury: Treasury[] | null,
    missions: Mission[] | null,
    conquests: Conquest[] | null
}

