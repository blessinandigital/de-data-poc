import * as contentful from 'contentful-management';
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import * as dotenv from 'dotenv';

// Need to move code out of the fr
export async function fetchData (){
  const sdk = useSDK<FieldAppSDK>();
  dotenv.config();

  const cma = sdk.cma;
  let accessToken: string = ''
  
  try{
    const client = contentful.createClient({
      accessToken: accessToken,
    });
    
    const space = await client.getSpace('snl01naumpba')
    const environment = await space.getEnvironment('master')
    const entries = await environment.getEntries()
    const ingredientsList = entries.items.map((entry) => entry.fields.toString())
    return ingredientsList
  }catch(error){
    console.error(error)
    return 'Error '+error
  }
}

