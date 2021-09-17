const mapAccessibilities = (accessibilities) => {
  accessibilities.forEach((accessibility, index, array) => {
    switch (accessibility.text) {
      case 'public': {
        array[index].text = 'Publikus';
        break;
      } case 'private': {
        array[index].text = 'Privát';
        break;
      } case 'invisible': {
        array[index].text = 'Láthatatlan';
        break;
      } case 'group_private': {
        array[index].text = 'Csoport szintű';
        break;
      }
    }
  })
}

export default mapAccessibilities;
