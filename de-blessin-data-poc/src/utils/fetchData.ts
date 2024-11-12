import * as contentful from 'contentful-management';
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";


export async function fetchData (){
  const sdk = useSDK<FieldAppSDK>();

  const cma = sdk.cma;
  
  try{
    const client = contentful.createClient({
      accessToken: '',
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

    // .then((space) => space.getEnvironment('master'))
    // .then((environment) => environment.getEntries())
    // .then((entries) => {
    //   // Handle fetched entries
    //   console.log(entries.items);
    //   return entries.items.toString()
    // }).catch((error) => {
    //   console.error('Error fetching data:', error);
    //   return error.toString(); // Return an empty string in case of an error
    // });

}

// const contentfulClientCMA = async () =>{
//   const sdk = useSDK<FieldAppSDK>();

//   const cma = contentful.createClient(
//     { apiAdapter: sdk.cmaAdapter },
//     {
//       type: 'plain',
//       defaults: {
//         environmentId: sdk.ids.environmentAlias ?? sdk.ids.environment,
//         spaceId: sdk.ids.space,
//       },
//     }
//   )
  
//   const locales = await cma.locale.getMany({})
// }

