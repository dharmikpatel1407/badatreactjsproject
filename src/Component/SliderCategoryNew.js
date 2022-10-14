import React, { useState, useEffect } from 'react';
import "../AppAsset/CSS/SliderCategory.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { getCategory } from "../AppApi";

const SliderCategoryNew = ({ onClickCategoryHandle }) => {

    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);
    const [select, setSelect] = useState(window.location.href?.split("cat=")[1]?.split("%20")?.join(" "));
    const [showOption, setShowOption] = useState(false);


    // let selectValue = window.location.href?.split("cat=")[1]?.split("%20")?.join(" ");

    const handleChange = (value, query) => {
        setShowOption(false);
        setSelect(query)
        onClickCategoryHandle(value, query)
    }

    const selectHandler = () => {
        setShowOption(!showOption)
    }

    useEffect(() => {
        async function fetchData() {
            const res = await getCategory();
            setData(res.data.data);
            setLoad(false)
        }

        fetchData()
    }, []);


    if (load) return "Loading...";

    return (

        <div className="sliderContainer sliderContainerNew" style={{ width: "100%", height: "50px" }}>
            {
                data.length > 0 ?
                    <div className='select-wrapper'>
                        <div className='select-box' onClick={selectHandler}>
                            <div className='select-text'>{select || "Please Select"}</div>
                            <ArrowDropDownIcon />
                        </div>

                        <div className='option-wrapper' style={{ display: showOption ? "block" : "none" }}>
                            {
                                data.map(el => {
                                    return (
                                        <div className='option' onClick={() => handleChange(el.id, el.name)}>
                                            <div>{el.name}</div>
                                            <img src={el?.icon} alt="" />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div> : "no data found"

                // </div>
                // <Select
                //     defaultValue={selectValue ? selectValue : "Select Value"}
                //     style={{
                //         width: 150,
                //     }}
                //     onChange={handleChange}
                //     dropdownClassName={"select-dropdown"}
                // >
                //     {
                //         data.map(el => {
                //             return (
                //                 <Option value={el.id} key={el.id}>
                //                     <div className="option-wrapper">
                //                         <div>{el.name}</div>
                //                         <img src={el?.bg_image} alt=""/>
                //                         </div>
                //                 </Option>
                //             );
                //         })
                //     }
                // </Select>
            }
        </div >
    )
}

export default SliderCategoryNew