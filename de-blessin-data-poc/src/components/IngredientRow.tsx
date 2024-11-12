import {
    Badge,
    EntryCard,
    MenuItem,
    Modal,
    Grid,
    GridItem,
    BadgeVariant,
  } from "@contentful/f36-components";
  import { IngredientLine } from "../types";
  import { useState } from "react";
  import React from "react";
  
  type Props = {
    onDeleteButtonClicked: (passedRow: IngredientLine) => void;
    row: IngredientLine;
  };
  
  export default function IngredientRow({ onDeleteButtonClicked, row }: Props) {
    const [isShown, setShown] = useState(false);
  
    const ingredient = row.ingredients?.[0]?.parsed?.[0];
    const { quantity = "", measure = "", foodMatch = "" } = ingredient || {};
    const { rawText, calories, totalNutrients } = row;
    const { FAT, CHOCDF, PROCNT } = totalNutrients;
    const totalFat = Math.round(FAT?.quantity);
    const totalCarbs = Math.round(CHOCDF?.quantity);
    const totalProtein = Math.round(PROCNT?.quantity);
    const badge: { variant: BadgeVariant; text: string } = ingredient
      ? { variant: "positive", text: "Matched" }
      : { variant: "negative", text: "Not Found" };
  
    return (
      <>
        <EntryCard
          contentType={rawText}
          title={`${quantity} ${measure} ${foodMatch}`}
          description={`calories: ${calories} • Total Fat: ${totalFat} • Total Carbs: ${totalCarbs}  • Total Protein: ${totalProtein}`}
          badge={<Badge variant={badge.variant}>{badge.text}</Badge>}
          withDragHandle
          onClick={() => setShown(true)}
          actions={[
            <MenuItem key="delete" onClick={() => onDeleteButtonClicked(row)}>
              Delete
            </MenuItem>,
          ]}
        />
        <Modal onClose={() => setShown(false)} isShown={isShown}>
          {() => (
            <>
              <Modal.Header
                title="Food Details"
                subtitle={foodMatch}
                onClose={() => setShown(false)}
              />
              <Modal.Content>
                <Grid
                  style={{ width: "100%" }}
                  columns="max-content max-content max-content"
                  rowGap="spacingM"
                  columnGap="spacingXs"
                >
                  {(Object.keys(totalNutrients) as Array<keyof typeof totalNutrients>).map(
                    keyName => {
                      const nutrient = totalNutrients[keyName];
                      return (
                        <React.Fragment key={keyName}>
                          <GridItem>{nutrient.label}</GridItem>
                          <GridItem style={{ fontWeight: "bold", textAlign: "right" }}>
                            {nutrient.quantity.toFixed(2)}
                          </GridItem>
                          <GridItem style={{ fontWeight: "bold" }}>{nutrient.unit}</GridItem>
                        </React.Fragment>
                      );
                    }
                  )}
                </Grid>
                <hr />
                <Grid
                  style={{ width: "100%" }}
                  columns="max-content max-content"
                  rowGap="spacingM"
                  columnGap="spacingXs"
                >
                  {ingredient &&
                    (Object.keys(ingredient) as Array<keyof typeof ingredient>)
                      .filter(keyName => keyName !== "nutrients")
                      .map(keyName => {
                        const value = ingredient[keyName];
                        return (
                          <React.Fragment key={keyName}>
                            <GridItem>{keyName}</GridItem>
                            <GridItem style={{ fontWeight: "bold" }}>{value}</GridItem>
                          </React.Fragment>
                        );
                      })}
                </Grid>
              </Modal.Content>
            </>
          )}
        </Modal>
      </>
    );
  }
  