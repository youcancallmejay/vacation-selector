
const availableVacations = [
  {
    id: 0,
    name: "5 day Mexican Adventure",
    location: "Mexico",
    duration: 5,
    ship: "Black Pearl",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg",
    description: "Indulge your love of water sports in beautiful Cabo San Lucas. Compare local tequilas in Mazatlán. Search for treasures in Puerto Vallarta’s chic art galleries."
  },
  {
    id: 1, 
    name: "5 day Alaskan Exploration",
    location: "Alaska",
    duration: 5, 
    ship: "HMS Endeavor",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Every_Road-_Denali_%287945497984%29.jpg",
    description: "Explore Alaska’s pristine wilderness on a roundtrip cruise from Vancouver. Glide through the splendid Tracy Arm Inlet and Glacier Bay. Visit Juneau, Skagway and Ketchikan."
  },
  {
    id: 2,
    name: "5 day Quebecois Journey",
    location: "Quebec",
    duration: 5, 
    ship: "HMS Interceptor",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Ch%C3%A2teau_Frontenac_after_a_freezing_rain_day_in_Quebec_city.jpg",
    description: "Carve a path from Boston to Montréal. Take in views of Charlottetown’s coppery cliffs, scenic cruise the St. Lawrence River and tour Québec City’s breathtaking chateau."

  }
]


export default function App() {
  return (
    <div className="App">
      <VacationList />
    </div>
  );
}

function VacationList(){
  const vacations = availableVacations;
  return(
    <div>
      {vacations.map((vacation) => <Vacation vacation={vacation} key={vacation.id}/>)}
    </div>
  )

}

function Vacation({vacation}){
return(
  <ul>
    <li>
      <h2>{vacation.name}</h2>
      <img src={vacation.image} alt={vacation.location}></img>
      <p>{vacation.description}</p>
      </li>
      <Button />
  </ul>
)
}

function Button(){
  return(
    <button>Learn More</button>
  )
}