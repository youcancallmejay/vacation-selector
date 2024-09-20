
const availableVacations = [
  {
    id: 0,
    name: "5 day Mexican Adventure",
    location: "Mexico",
    duration: 5,
    ship: "Black Pearl"
  },
  {
    id: 1, 
    name: "5 day Alaskan Exploration",
    location: "Alaska",
    duration: 5, 
    ship: "HMS Endeavor"
  },
  {
    id: 2,
    name: "5 day Quebecois Journey",
    location: "Quebec",
    duration: 5, 
    ship: "HMS Interceptor"
  }
]


export default function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

function VacationList(){
  const vacations = availableVacations;
  return(
    <div>
      {vacations.map((vacation) => <Vacation vacation={vacation}/>)}
    </div>
  )

}

function Vacation({vacation}){
  <ul>
    <li>{vacation.name}</li>
  </ul>
}
