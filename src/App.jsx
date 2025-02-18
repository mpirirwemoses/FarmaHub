

import './App.css'
import FarmerConnections from './assets/Components/FarmtoTableConnect'
import Mock from './assets/Components/MockFarmerconnections'
import StoryComponent from './assets/Components/BookContractMock'
import FarmerProf from './assets/Components/MockFarmerProfile'
import Category from './assets/Components/Products'
import CategoryDisplay from './assets/Components/ProductsCategoryDisplay'
import ProductListDisplay from './assets/Components/ProductsListDisplay'
import MockDash from './assets/Components/MockDataDash'
import ContractApply from './assets/Components/ContractForm'
import Profile from './assets/Components/ContractsList'
import ContractOpportunities from './assets/Components/Opportunities'
import { ExampleUsage } from './assets/Components/ContractDetails'
import Navbar from './assets/Components/NavBar'

function App() {
  

  return (<>
  <Navbar/>
   <Category/>
   <CategoryDisplay/>
   <ProductListDisplay/>
   
   <Mock/>
   <FarmerProf/>
   <StoryComponent/>
   <MockDash/> 
   {/* <ContractApply/> */}
   <Profile/> 
   <ContractOpportunities/>
   <ExampleUsage/>
   
   </>
  )
}

export default App
