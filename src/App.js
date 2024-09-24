import { useState } from "react";

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
  const [bookNowVisible, setBookNowVisible] = useState(false);


  function handleSelectedVacation(newSelection){
    setSelectedVacation(newSelection);
  }

  function handleBookNow(){
    setBookNowVisible(true)
  }

  return (
    <div className="App">
      <VacationList onSelectedVacation={handleSelectedVacation} />
      {selectedVacation.id && <HighlightedVacation  selectedVacation={selectedVacation} onBookNow={handleBookNow} />}
      {bookNowVisible && selectedVacation.excursions && <BookNow selectedVacation={selectedVacation}/>}
    </div>
  );
}

function BookNow({selectedVacation}){
return(
  <div>
    <h3>Let's choose your excursions now!</h3>
    
    {selectedVacation.excursions ? (
        <ul>
          {selectedVacation.excursions.map((excursion) => (
            <li key={selectedVacation.id}>
              <label>
                <input type="checkbox"/>
                ${excursion.price} {excursion.name}
                </label>
              </li>
          ))}
        </ul>
      ) : (
        <p>No ports of call available.</p> // Optional message if portsOfCall is not defined
      )}


  </div>
)
}

function HighlightedVacation({selectedVacation, onBookNow}){

  return(
    <div>
      <h3>Selected Vacation</h3>
      <h3>{selectedVacation.name} ONLY <span style={{textDecorationLine: 'underline'}}>${selectedVacation.price}</span></h3>
      {selectedVacation.portsOfCall ? (
        <ul>
          {selectedVacation.portsOfCall.map((port, index) => (
            <li key={index}>{port}</li>
          ))}
        </ul>
      ) : (
        <p>No ports of call available.</p> // Optional message if portsOfCall is not defined
      )}
      <img src={selectedVacation.image} alt={selectedVacation.location}></img>
      <Button label="Book now" onClick={onBookNow}></Button>
    </div>
  ) 
}

function VacationList({onSelectedVacation}){
  const vacations = availableVacations;
  return(
    <div>
      {vacations.map((vacation) => <Vacation vacation={vacation} key={vacation.id} onSelectedVacation={onSelectedVacation}/>)}
    </div>
  )

}

function Vacation({onSelectedVacation, vacation}){
return(
  <ul>
    <li>
      <h2>{vacation.name}</h2>
      <img src={vacation.image} alt={vacation.location}></img>
      <p>{vacation.description}</p>
      </li>
      <Button label="Learn More" onClick={() => onSelectedVacation(vacation)}/>
  </ul>
)
}

function Button({onClick, label, className, style}){
  return(
    <button onClick={onClick}>{label}</button>
  )
}