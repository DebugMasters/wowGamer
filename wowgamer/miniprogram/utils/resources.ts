enum OrderImgPaths{
  Paladin= '1.png', //圣骑士
  Warrior= '2.png', //战士
  DeathKnight= '3.png', //死亡骑士
  Hunter= '4.png', //猎人
  Shaman= '5.png', //萨满祭司
  Rogue= '6.png', //潜行者
  Dryad= '7.png', //德鲁伊
  DemonHunter= '8.png', //恶魔猎手
  Mage= '9.png', //法师
  Priest= '10.png', //牧师
  Warlock= '11.png', //术士
  Monk= '12.png', //武僧
}
enum CharacterImgPaths{
  Paladin= 'c1.jpg', //圣骑士
  Warrior= 'c2.jpg', //战士
  DeathKnight= 'c3.jpg', //死亡骑士
  Hunter= 'c4.jpg', //猎人
  Shaman= 'c5.jpg', //萨满祭司
  Rogue= 'c6.jpg', //潜行者
  Dryad= 'c7.jpg', //德鲁伊
  DemonHunter= 'c8.jpg', //恶魔猎手
  Mage= 'c9.jpg', //法师
  Priest= 'c10.jpg', //牧师
  Warlock= 'c11.jpg', //术士
  Monk= 'c12.jpg', //武僧
}

export const getResources = (name: string, type: string) => {
  if(type == 'order') {
    switch (name) {
      case '1':
        return OrderImgPaths.Paladin
        break;
      case '2':
        return OrderImgPaths.Warrior
        break;
      case '3':
        return OrderImgPaths.DeathKnight
        break;
      case '4':
        return OrderImgPaths.Hunter
        break;
      case '5':
        return OrderImgPaths.Shaman
        break;
      case '6':
        return OrderImgPaths.Rogue
        break;
      case '7':
        return OrderImgPaths.Dryad
        break;
      case '8':
        return OrderImgPaths.DemonHunter
        break;
      case '9':
        return OrderImgPaths.Mage
        break;
      case '10':
        return OrderImgPaths.Priest
        break;
      case '11':
        return OrderImgPaths.Warlock
        break;
      case '12':
        return OrderImgPaths.Monk
        break;
    }
  } else if (type == 'character') {
    switch (name) {
      case '1':
        return CharacterImgPaths.Paladin
        break;
      case '2':
        return CharacterImgPaths.Warrior
        break;
      case '3':
        return CharacterImgPaths.DeathKnight
        break;
      case '4':
        return CharacterImgPaths.Hunter
        break;
      case '5':
        return CharacterImgPaths.Shaman
        break;
      case '6':
        return CharacterImgPaths.Rogue
        break;
      case '7':
        return CharacterImgPaths.Dryad
        break;
      case '8':
        return CharacterImgPaths.DemonHunter
        break;
      case '9':
        return CharacterImgPaths.Mage
        break;
      case '10':
        return CharacterImgPaths.Priest
        break;
      case '11':
        return CharacterImgPaths.Warlock
        break;
      case '12':
        return CharacterImgPaths.Monk
        break;
    }
  }
}