import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { object } from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

import ImageDialog from '../ImageDialog';
import ImageCard from '../ImageCard';
import headersMapping from '../api/tableHeadersMapping';
import SortSelect from '../SortSelect';
import sorts from '../sorts/sorts';
import RowsNumSelect from '../CardsNumSelect';

import './nasaTable.scss';

const appSettings = {
  cardsPerPage: 5,
  cardsNumberOptions: [5, 10, 25],
};

const tableHeaders = Object.keys(headersMapping);

class NasaTable extends Component {
  state = {
    data: {
      headers: [],
      table: [],
    },
    visibleRows: null,
    page: 0,
    rowsPerPage: appSettings.cardsPerPage,
    isModalOpen: false,
    clickedImage: '',
    clickedImageName: '',
    isDescendingSort: true,
    sortKey: 'imgName',
  };

  handleClose = () => this.setState({ isModalOpen: false });

  getDataToShow = (table, from, rowsPerPage, sortKey, isDescendingSort) => {
    return sortKey
      ? sorts(table, sortKey, isDescendingSort).filter((row, i) => i >= from && i < from + rowsPerPage)
      : table.filter((row, i) => i >= from && i < from + rowsPerPage);
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
    const { rowsPerPage, page, data, sortKey, isDescendingSort } = this.state;
    if (prevState.isDescendingSort !== this.state.isDescendingSort) {
      this.setDataToShow({ rowsPerPage, page, data, sortKey, isDescendingSort });
    }

    if (prevState.rowsPerPage !== this.state.rowsPerPage) {
      this.setDataToShow({ rowsPerPage, page, data, sortKey, isDescendingSort });
    }

    if (prevProps.data.table.length !== this.props.data.table.length) {
      const newData = this.props;
      this.setDataToShow({ rowsPerPage, page, data: newData.data, sortKey, isDescendingSort });
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

  handlePageChange = (event, page) => {
    const { rowsPerPage, data, sortKey, isDescendingSort } = this.state;
    this.setState(
      {
        page: page - 1,
      },
      () => {
        this.setDataToShow({ rowsPerPage, page: page - 1, data, sortKey, isDescendingSort });
      },
    );
  };

  handleRowsNumChange = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { page, visibleRows, isModalOpen, clickedImage, clickedImageName } = this.state;
    const { data } = this.props;
    const { table = [] } = data;

    return (
      <>
        <ImageDialog open={isModalOpen} onClose={this.handleClose} image={clickedImage} imageName={clickedImageName} />
        <div className="container">
          {visibleRows &&
            visibleRows.map((row, i) => (
              <div
                key={i}
                className="card-wrapper"
                onClick={() => {
                  this.openDialog(row.fullName, row.imgName);
                }}
              >
                <ImageCard key={i} photoData={row}></ImageCard>
              </div>
            ))}
        </div>
        <div className="bottom-info">
          <SortSelect isDescendingSort={this.state.isDescendingSort} sortData={this.sortData} />
          <RowsNumSelect
            rowsValues={appSettings.cardsNumberOptions}
            handleRowsNumChange={this.handleRowsNumChange}
            defaultValue={appSettings.cardsPerPage}
          ></RowsNumSelect>
          <Pagination
            page={page + 1}
            onChange={this.handlePageChange}
            count={table && Math.ceil(table.length / this.state.rowsPerPage)}
          ></Pagination>
        </div>
      </>
    );
  }
}

NasaTable.propTypes = {
  data: object,
};

export default NasaTable;
