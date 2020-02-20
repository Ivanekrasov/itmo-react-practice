import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';

import TablePagination from '@material-ui/core/TablePagination';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';

import ImageDialog from '../ImageDialog';
import ImageCard from '../ImageCard';
import headersMapping from '../api/tableHeadersMapping';
import getData from '../api/api';
import sorts from '../sorts/sorts';

import './nasaTable.scss';

const tableHeaders = Object.keys(headersMapping);

const NasaForm = styled(FormControl)({
  minWidth: 80,
});

class NasaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      visibleRows: null,
      page: 0,
      rowsPerPage: 10,
      isModalOpen: false,
      clickedImage: '',
      clickedImageName: '',
      isDescendingSort: true,
      sortKey: '',
    };
    this.rowsValues = [5, 10, 25];
  }

  handleClose = () => this.setState({ isModalOpen: false });

  getDataToShow = (table, from, rowsRepPage, sortKey, isDescendingSort) => {
    return sortKey
      ? sorts(table, sortKey, isDescendingSort).filter((row, i) => i >= from && i < from + rowsRepPage)
      : table.filter((row, i) => i >= from && i < from + rowsRepPage);
  };

  nextPage = () => {
    const { rowsPerPage, page, data } = this.state;
    const from = rowsPerPage * (page + 1);
    const visibleRows = this.getDataToShow(data.table, from, rowsPerPage);
    this.setState({ visibleRows, page: page + 1 });
  };

  prevPage = () => {
    const { rowsPerPage, page, data } = this.state;
    const from = rowsPerPage * (page - 1);
    const visibleRows = this.getDataToShow(data.table, from, rowsPerPage);
    this.setState({ visibleRows, page: page - 1 });
  };

  changeRow = e => {
    const { data } = this.state;
    const rows = +e.target.value;
    const visibleRows = this.getDataToShow(data.table, 0, rows);
    this.setState({ rowsPerPage: rows, visibleRows, page: 0 });
  };

  setDataToShow = ({ rowsPerPage, page, data, sortKey, isDescendingSort }) => {
    const from = rowsPerPage * page;
    const visibleRows = this.getDataToShow(data.table, from, rowsPerPage, sortKey, isDescendingSort);
    this.setState({ data, visibleRows });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDescendingSort !== this.state.isDescendingSort) {
      const { rowsPerPage, page, data, sortKey, isDescendingSort } = this.state;
      this.setDataToShow({ rowsPerPage, page, data, sortKey, isDescendingSort });
    }
  }

  sortData = (isDescendingSort, header) =>
    this.setState({ isDescendingSort: !isDescendingSort, sortKey: headersMapping[header] });

  fillCell = (row, i) => {
    const cellData = row[headersMapping[tableHeaders[i]]];
    return i ? (
      <TableCell key={i}>{cellData}</TableCell>
    ) : (
      <TableCell onClick={() => this.openDialog(row.fullName, row.imgName)} className="first-item" key={i}>
        {cellData}
      </TableCell>
    );
  };

  openDialog = (img, name) => {
    this.setState({ isModalOpen: true, clickedImage: img, clickedImageName: name });
  };

  async componentDidMount() {
    const { rowsPerPage, page } = this.state;
    const data = await getData();
    this.setDataToShow({ rowsPerPage, page, data });
  }

  render() {
    const { data, page, rowsPerPage, visibleRows, isModalOpen, clickedImage, clickedImageName } = this.state;
    const { table = [] } = data;

    return (
      <>
        <ImageDialog open={isModalOpen} onClose={this.handleClose} image={clickedImage} imageName={clickedImageName} />
        <div className="container">
          {visibleRows && visibleRows.map((row, i) => <ImageCard key={i} photoData={row}></ImageCard>)}
        </div>
        <div className="bottom-info">
          <NasaForm className="form">
            <InputLabel id="nasa-simple-select-label" className="nasa-simple-select-label">
              Sort by:
            </InputLabel>
            <Select labelId="nasa-simple-select-label" id="nasa-simple-select" autoWidth={true}>
              <MenuItem value={10}>Rover</MenuItem>
              <MenuItem value={20}>Camera</MenuItem>
              <MenuItem value={30}>Sol</MenuItem>
            </Select>
          </NasaForm>

          <TablePagination
            rowsPerPageOptions={this.rowsValues}
            component="div"
            count={table && table.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangeRowsPerPage={this.changeRow}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
              onClick: this.prevPage,
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
              onClick: this.nextPage,
            }}
            onChangePage={() => {}}
          />
        </div>
      </>
    );
  }
}

export default NasaTable;
