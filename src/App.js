import { useState, useEffect } from "react";

const availableVacations = [
  {
    id: 1,
    name: "5 day Mexican Adventure",
    location: "Mexico",
    duration: 5,
    price: 299,
    ship: "Black Pearl",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg",
    description: "Indulge your love of water sports in beautiful Cabo San Lucas. Compare local tequilas in Mazatlán. Search for treasures in Puerto Vallarta’s chic art galleries.",
    portsOfCall: ["Cabo San Lucas", "Mazatlán", "Puerto Vallarta"],
    excursions: [
      { id: 0, name: "Snorkeling", price: 99, description: "Explore underwater life." },
      { id: 1, name: "Tequila Tasting", price: 75, description: "Compare local tequilas in Mazatlán." },
      { id: 2, name: "Art Gallery Tour", price: 30, description: "Discover art in Puerto Vallarta." },
    ],
  },
  {
    id: 2, 
    name: "5 day Alaskan Exploration",
    location: "Alaska",
    duration: 5,
    price: 1199,  
    ship: "HMS Endeavor",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Every_Road-_Denali_%287945497984%29.jpg",
    description: "Explore Alaska’s pristine wilderness on a roundtrip cruise from Vancouver. Glide through the splendid Tracy Arm Inlet and Glacier Bay. Visit Juneau, Skagway and Ketchikan.",
    portsOfCall: ["Juneau", "Skagway", "Ketchikan"],
    excursions: [
      { id: 0, name: "Glacier Hiking", price: 299, description: "Hike on glaciers in Juneau." },
      { id: 1, name: "Dog Sledding", price: 99, description: "Experience dog sledding in Skagway." },
      { id: 2, name: "Whale Watching", price: 149, description: "See whales up close in Ketchikan." },
    ],
  },
  {
    id: 3,
    name: "5 day Quebecois Journey",
    location: "Quebec",
    duration: 5, 
    price: 399,
    ship: "HMS Interceptor",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Ch%C3%A2teau_Frontenac_after_a_freezing_rain_day_in_Quebec_city.jpg",
    description: "Carve a path from Boston to Montréal. Take in views of Charlottetown’s coppery cliffs, scenic cruise the St. Lawrence River and tour Québec City’s breathtaking chateau.",
    portsOfCall: ["Boston", "Charlottetown", "Québec City", "Montréal"],
    excursions: [
      { id: 0, name: "Old Quebec City Tour", price: 99, description: "Explore the historic streets of Old Quebec." },
      { id: 1, name: "Whale Watching on the St. Lawrence", price: 249, description: "Spot whales along the scenic St. Lawrence River." },
      { id: 2, name: "Montmorency Falls", price: 149, description: "Visit the stunning waterfalls just outside Quebec City." },
    ],

  }
]


export default function App() {


  const [selectedVacation, setSelectedVacation] = useState({});
  const [selectedGuest, setSelectedGuest] = useState()
  const [bookNowVisible, setBookNowVisible] = useState(false);
  const [bookGuestVisbile, setBookGuestVisible] = useState(false);
  const [guest, setGuest] = useState([])

  useEffect(() => {
    const updatedGuest = guest.find((g) => g.email === selectedGuest?.email);
    setSelectedGuest(updatedGuest || {});
  }, [guest, selectedGuest]);

  function handleUpdateTotal(guestObject, balance){
    setGuest((prevGuest) => prevGuest.map((g) => g.email === guestObject.email ? {...g, balance} : g))
    const updatedGuest = guest.find((g) => g.email === guestObject.email);
    setSelectedGuest(updatedGuest || {});

  }

  function handleSelectedVacation(newSelection){
    setSelectedVacation(newSelection);
    setBookNowVisible(false);
  }

  function handleAddGuest(newGuest){
    const guestWithKey = {...newGuest, key: Date.now()}
    setGuest(prevGuest => [...prevGuest, guestWithKey])
  }

  function handleGuestFormVisible(){
    setBookGuestVisible(true);
  }

  function handleBookNow(selectedGuest){
    setSelectedGuest(selectedGuest)
    setBookNowVisible(true)
  }

  return (
    <div className="App">
      <VacationList onSelectedVacation={handleSelectedVacation} />
      {selectedVacation.id && <HighlightedVacation  selectedVacation={selectedVacation} onGuestVisible={handleGuestFormVisible} />}
      {bookNowVisible && <BookNow selectedVacation={selectedVacation} selectedGuest={selectedGuest} onHandleUpdateTotal={handleUpdateTotal} />}
      {bookGuestVisbile && <BookGuest onAddGuest={handleAddGuest}  guest={guest} onBookNow={handleBookNow} selectedVacation={selectedVacation}/>}
    </div>
  );
}

function BookNow({selectedVacation, selectedGuest, onHandleUpdateTotal}){

  // onHandleUpdateTotal(selectedGuest, selectedVacation.price);
 // const total = selectedGuest.balance;
  const total = selectedGuest.balance; 

const insurance = total * .2;

function handleAddOn(value, isChecked){
  if(isChecked){
    onHandleUpdateTotal(selectedGuest, (total + value))
  } else{
    onHandleUpdateTotal(selectedGuest, (total - value))
  }
}

// work on math for adding insurance and fix formatting 
return(
  <div className="total-cost-container">
     <h2>{selectedGuest.firstName}'s total: ${selectedGuest.balance}</h2>
      <label>
        <input type="checkbox" value={insurance} onChange={((e) => handleAddOn(Number(e.target.value), e.target.checked))}></input>
        <h3 style={{color:"red"}}>Add trip insurance:</h3> ${insurance}
      </label>

    <div className="total-cost-extras">
      <h3>Let's choose your addons now!</h3>
      {selectedVacation.excursions ? (
          <ul>
            {selectedVacation.excursions.map((excursion) => (
              <li key={selectedVacation.id}>
                <label>
                  <input type="checkbox" value={excursion.price} onChange={(e) => handleAddOn(Number(e.target.value), e.target.checked)}/>
                  ${excursion.price} {excursion.name}
                  </label>
                </li>
            ))}
          </ul>
        ) : (
          <p>No ports of call available.</p> // Optional message if portsOfCall is not defined
        )}
    </div>
  </div>
)
}

function BookGuest({onAddGuest, onBookNow, guest, selectedVacation}){

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [balance, setBalance] = useState(0)

  function onHandleSubmit(e){
    e.preventDefault();
    if(guest.length>=4){
      alert("Only a maximum of 4 guests can be added.")
      setFirstName("");
      setLastName("");
      setEmail("");
      return;
    }
    onAddGuest({ 
      firstName,
      lastName,
      email,
      balance: selectedVacation.price
     });
    
    setFirstName("");
    setLastName("");
    setEmail("");
    setBalance(0);
  }

  return(
    <div>
        <form onSubmit={onHandleSubmit}>
          <label name="firstName" > First Name </label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>

          <label name="lastName"> Last Name </label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>

          <label name="email"> Email </label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <Button label="Add Guest"></Button>

        </form>
        <ul>
          {guest.map((person) => <li><label>{person.firstName} || {person.lastName} || {person.email} || {guest.length}</label> <Button onClick={() => onBookNow(person)}label="check out"> </Button></li>)}
        </ul>
    </div>

  )
}

function HighlightedVacation({selectedVacation, onGuestVisible}){

  return(
    <div className="highlighted-vacation-container">
      <img src={selectedVacation.image} alt={selectedVacation.location}></img>
      <div className="highlighted-vacation-info"> 
        <h3>{selectedVacation.name} ONLY <span style={{textDecoration: "underline"}}>${selectedVacation.price}</span></h3>
          {selectedVacation.portsOfCall ? (
            <ul>
              {selectedVacation.portsOfCall.map((port, index) => (
                <li key={index}>{port}</li>
              ))}
            </ul>
          ) : (
            <p>No ports of call available.</p> // Optional message if portsOfCall is not defined
          )}
          <Button label="Book now" onClick={onGuestVisible} className="book-now-button"></Button>
      </div>


    </div>
  ) 
}

function VacationList({onSelectedVacation}){
  const vacations = availableVacations;
  return(
    <div  className="vacation-list-container">
      {vacations.map((vacation) => <Vacation vacation={vacation} key={vacation.id} onSelectedVacation={onSelectedVacation}/>)}
    </div>
  )

}

function Vacation({onSelectedVacation, vacation}){
return(
  <div className="vacation-list">
        <h2>{vacation.name}</h2>
        <img src={vacation.image} alt={vacation.location}></img>
        <p>{vacation.description}</p>
        <Button label="Learn More" onClick={() => onSelectedVacation(vacation)}/>
  </div>
)
}

function Button({onClick, label, className, style}){
  return(
    <button onClick={onClick} className={className}>{label}</button>
  )
}