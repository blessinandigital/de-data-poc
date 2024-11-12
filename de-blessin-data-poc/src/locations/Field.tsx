import { FieldExtensionSDK } from "@contentful/app-sdk";
import { Button, Flex, Textarea, TextInput,  } from "@contentful/f36-components";
import { useCMA, useSDK } from "@contentful/react-apps-toolkit";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IngredientLine } from "../types";
import IngredientRow from "../components/IngredientRow";
import { fetchData } from '../utils/fetchData'
import { KeyValueMap } from "contentful-management";
import * as contentful from 'contentful-management';
import { FieldAppSDK } from "@contentful/app-sdk";

const API_BASE_URL = "https://api.edamam.com/api";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();
  const fieldId = sdk.field.id;
  const { edamamApiKey, edamamAppId } = sdk.parameters.instance;
  const fieldValue = sdk.field.getValue();
  const initialRows: IngredientLine[] = fieldValue || [];

  const [rows, setRows] = useState<IngredientLine[]>(initialRows);
  const [value, setValue] = useState("");

  const [fetchedData, setFetchedData] = useState< string|string[]>('0000');

async function fetchData (){
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
}
  useEffect(() => {
    fetchData()
      .then((result: string | string[]) => {
        setFetchedData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setFetchedData('error '+ error)
      });
  }, []);

  const getFoodData = async () => {
    const ingredientList = value.split('\n')
    console.debug('ingredientList ', ingredientList)
    const response = await fetch(
      `${API_BASE_URL}/nutrition-details?app_id=${edamamAppId}&app_key=${edamamApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingr: ingredientList,
          prep: [
            ""
          ]
        }),
      }
    );
    return await response.json();
  };

  const processEntry = async () => {
    console.log('--->', rows);
    const foodData = await getFoodData();
    const newRows = [
      ...rows,
      {
        id: uuidv4(),
        rawText: value,
        ...foodData,
      },
    ];
    console.log('-->', newRows)

    setRows(newRows);
    sdk.field.setValue(newRows);
    // sdk.entry.fields[fieldId].setValue(newRows, "de");
    // cma.entry
    //   .getMany({
    //   query: {
    //     content_type: "product",
    //     "fields.internalName": "Jim's legendary coffee mug",
    //   },
    //   })
    //   .then(entries => {
    //   if (entries.items.length === 0) {
    //     sdk.dialogs.openExtension({
    //     title: "Create New Product",
    //     width: 800,
    //     parameters: {
    //       internalName: "Jim's legendary coffee mug",
    //     },
    //     }).then((newEntry) => {
    //     if (newEntry) {
    //       console.log("New product entry created:", newEntry);
    //     }
    //     }).catch(error => {
    //     console.error("Error opening dialog:", error);
    //     });
    //   } else {
    //     console.log(entries.items);
    //   }
    //   })
    //   .catch(error => {
    //   console.error("Error fetching entries:", error);
    //   });
    setValue("");
  };

  // const getAllEntries = async () => {
  //   const allEntriesFetched = await fetchData();
  //   console.log(allEntriesFetched)
  //   setFetchedData(allEntriesFetched)
  // };

  // const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") processEntry();
  // };

  const onDeleteButtonClicked = (passedRow: IngredientLine) => {
    const updatedRows = rows.filter(row => row !== passedRow);
    setRows(updatedRows);
    sdk.field.setValue(updatedRows);
  };

  useEffect(() => {
    sdk.window.startAutoResizer();
  });

  return (
    <>
      <Flex flexDirection="column" gap="8px" style={{ marginTop: "8px", marginBottom: "16px" }}>
        {rows.map(row => (
          <IngredientRow onDeleteButtonClicked={onDeleteButtonClicked} row={row} key={row.id} />
        ))}
      </Flex>
      <Textarea
        name="ingredient"
        placeholder="Add ingredients"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <Button onClick={() =>
      processEntry()}
      >Match
      </Button>
      <br />
      {/* <Button onClick={() => getAllEntries()}>Fetch All Entries</Button> */}
      <div style={{backgroundColor: "yellow", border: "3px"}}>
        <h3>All Entries</h3>
        <p>fetchedData: {fetchedData}</p>
        </div>
    </>
  );
};

export default Field;
