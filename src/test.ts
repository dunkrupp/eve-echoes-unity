import choices from "./Data/Shipyard/ship-autocomplete.json"


console.log(
  choices.filter(elem => {
    return elem.name.indexOf('Vexor') !== -1
  })
)
