import React from 'react';
import { useParams } from 'react-router-dom';
import { Error404, Mirror, HandCream, FaceBrush, Bag, Rimmel, LampLipGloss, CapsulLipGloss, FruitLipBalm, FantasyBrush, BhCosmeticBrush, MaskBrush } from '../../components'


const ShowSection = () => {
    const { section } = useParams()

    return (
        <div className="container ShowSection">
            {/* <Error404 /> */}
            {section === "Mirror" ? (
                <Mirror />
            ) : ""}

            {section === "HandCream" ? (
                <HandCream />
            ) : ""}

            {section === "FaceBrush" ? (
                <FaceBrush />
            ) : ""}

            {section === "Bag" ? (
                <Bag />
            ) : ""}

            {section === "Rimmel" ? (
                <Rimmel />
            ) : ""}

            {section === "Lamp_LipGloss" ? (
                <LampLipGloss />
            ) : ""}

            {section === "Capsul_LipGloss" ? (
                <CapsulLipGloss />
            ) : ""}

            {section === "Fruit_LipBalm" ? (
                <FruitLipBalm />
            ) : ""}

            {section === "Fantasy_Brush" ? (
                <FantasyBrush />
            ) : ""}

            {section === "BhCosmetic_Brush" ? (
                <BhCosmeticBrush />
            ) : ""}

            {section === "Mask_Brush" ? (
                <MaskBrush />
            ) : ""}
        </div>
    );
}

export default ShowSection;