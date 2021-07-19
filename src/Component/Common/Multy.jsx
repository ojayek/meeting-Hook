import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import MeetingContext from '../../Context/meetingContext';
import '@fontsource/vazir';
import '../../css/Font.css';
const Multi = () => {
  const [Nam, setNam] = useState('');
  const [NamKhanevadegi, setNamKhanevadegi] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [value, setValue] = useState([]);

  const meetingContext = useContext(MeetingContext);

  const {
    SearchPersonByInputValue,
    personList,

    error,
  } = meetingContext;

  const getOptions = async () => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Nam: Nam,
    //     NamKhanevadegi: NamKhanevadegi,
    //   },
    // };

    // const res = await axios.get(
    //   'http://localhost:58148/api/Meeting/GetPersons',

    //   config
    // );

    // const data = res.data;
    console.log('personList in Multi', personList);
    const data = personList;

    const options = data.map((d) => ({
      value: d.Prsnum,
      label: d.Nam + '-' + d.NamKhanevadegi,
    }));

    setSelectOptions(options);
  };

  const handleChange = (e) => {
    console.log(e[0]);
    // setNam(e[0].value);
    // setNamKhanevadegi(e[0].label);
  };
  const searchByInputValue = (e) => {
    console.log(e);
    SearchPersonByInputValue(e);
    setTimeout(() => {
      console.log('personList', personList);
      getOptions();
    }, 10);
    // setNam(e[0].value);
    // setNamKhanevadegi(e[0].label);
  };

  useEffect(() => {
    getOptions();
  }, []);
  var divStyle = {
    fontSize: { fontFamily: 'vazir' },
    innerWidth: 400,
  };
  return (
    <div>
      <Select
        styles={divStyle}
        options={selectOptions}
        onChange={handleChange}
        onInputChange={searchByInputValue}
        isSearchable
        isMulti
      />
      {value === null
        ? ''
        : value.map((v) => <h4>{v.value + ' ' + v.label}</h4>)}
    </div>
  );
};

export default Multi;
