import type React from 'react';
import * as comp from '../Helpers/react_bootstrapComp';

export interface SearchFormProps{
    ButtonHandleReset:React.MouseEventHandler<HTMLButtonElement>;
    ButtonDisabled: boolean;
    FormControl_onChange:React.Dispatch<React.SetStateAction<string>>
    FormControl_Value: string | string[] | number;
    Form_OnSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

function SearchForm(props:SearchFormProps){
    return(
        <comp.Form onSubmit={props.Form_OnSubmit} className="mb-4">
        <comp.Row>
          <comp.Col md={8} className="mb-2 mb-md-0">
            <comp.Form.Control
              type="text"
              placeholder="Search by username..."
              value={props.FormControl_Value}
              onChange={(e) => props.FormControl_onChange(e.target.value)}
            />
          </comp.Col>
          <comp.Col md={2} xs={6}>
            <comp.Button type="submit" variant="primary" className="w-100" disabled={props.ButtonDisabled}>
              {props.ButtonDisabled ? 'Searching...' : 'Search'}
            </comp.Button>
          </comp.Col>
          <comp.Col md={2} xs={6}>
            <comp.Button type="button" variant="secondary" className="w-100" onClick={props.ButtonHandleReset}>
              Reset
            </comp.Button>
          </comp.Col>
        </comp.Row>
      </comp.Form>)
}

export default SearchForm;