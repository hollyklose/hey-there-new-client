import moment from 'moment'

const calculateUrgency = (contacts) => {
  const newArray = []

  for (let i = 0; i < contacts.length; i++) {
  // subtract lastContacted from today's Date
    let elapsedTimeDays = Math.floor((moment() - moment(contacts[i].lastContacted)) / 86400000)
    if (elapsedTimeDays === 0) {
      elapsedTimeDays = 1
      console.log('elapsed', 1)
    }
    // # days from above divided by frequency desired
    // multiply by 100 and take Math.floor
    const percentElapsedTime = Math.floor((elapsedTimeDays / contacts[i].frequency) * 100)
    console.log('percentelapsed', percentElapsedTime)
    // average the result from above with the set priority to get importance number
    const listValue = (percentElapsedTime + contacts[i].priority) / 2
    contacts[i].listValue = listValue
    newArray.push(contacts[i])
  }
  const sortedArray = newArray.sort((a, b) => (b.listValue) - (a.listValue))
  console.log('sortedarray', sortedArray)
  return sortedArray
}

export default calculateUrgency
