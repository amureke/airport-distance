import { useEffect, useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getAirports } from '../../utils/rapidapi';
import { Airport, AirportType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { updateStartingPoint } from '../../state/start';
import { updateDestination } from '../../state/destination';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface IProps {
  type: AirportType
}

export default function Asyncautocomplete(props: IProps) {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Airport[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(open && options.length === 0 && inputValue !== '');
  const [typingTimer , setTypingTimer] = useState<any>();

  useEffect(() => {
    
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      
      await sleep(1e3);

      if (active) {
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const filterAirport = async (keyword : string) => {
    console.log('api call');
    const filteredAirports: Airport[] = await getAirports(keyword);
    setOptions([...filteredAirports]);
  }

  const selectAirport = (airport: any)  => {
    if (props.type === AirportType.Start) {
      dispatch(updateStartingPoint(airport));
    } else {
      dispatch(updateDestination(airport));
    }
  }

  const onInputChange = (newInputValue: string) => {
    setInputValue(newInputValue);
    // to avoid multiple unnecessary api calls
    clearTimeout(typingTimer);
    setTypingTimer(
      setTimeout(function () {
        filterAirport(newInputValue);
      }, 1000)
    );
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      // sx={{ width: 500 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.AirportName === value.AirportName}
      getOptionLabel={(option) => option.AirportName}
      options={options}
      loading={loading}
      onChange={(event, value) => selectAirport(value)} // prints the selected value
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => onInputChange(newInputValue)}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
