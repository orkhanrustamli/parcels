import qs from 'qs';

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterMetadata, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { AddModalComponent } from '../../components/add-modal/add-modal.component';
import { ParcelsService } from '../../parcels.service';
import { Pagination, Parcel } from '../../types';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrl: './parcels.component.scss',
})
export class ParcelsComponent {
  constructor(
    private parcelsService: ParcelsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.initFiltersAndPagination();
  }

  loading: boolean = true;
  parcels: Parcel[] = [];

  filters: Record<string, FilterMetadata[]> = {};
  pagination: Pagination = {
    total: 0,
    page: 1,
    pages: 0,
    limit: 10,
  };

  filterableColumns = ['description', 'country'] as const;
  countryFilterContraints: SelectItem[] = [
    {
      label: 'Equals',
      value: 'is',
    },
  ];
  descriptionFilterConstraints: SelectItem[] = [
    ...this.countryFilterContraints,
    {
      label: 'Contains',
      value: 'contains',
    },
    {
      label: 'Starts with',
      value: 'starts',
    },
    {
      label: 'Ends with',
      value: 'ends',
    },
  ];

  dialogRef: DynamicDialogRef | undefined;

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.loadParcels();
    });
  }

  initFiltersAndPagination() {
    const queryString = window.location.search.substring(1);
    if (!queryString) return;

    const query = qs.parse(queryString);
    const { limit, page, ...searchParams } = query;

    this.pagination.limit = limit ? parseInt(limit as string, 10) : 10;
    this.pagination.page = page ? parseInt(page as string, 10) : 1;

    this.formatPrimeFilters(searchParams);
  }

  formatPrimeFilters(searchParams: Record<string, any>) {
    const filters: typeof this.filters = {};

    for (const field in searchParams) {
      const matchMode = Object.keys(searchParams[field])[0];
      filters[field] = [
        {
          matchMode: matchMode,
          value: searchParams[field][matchMode],
        },
      ];
    }

    this.filters = filters;
  }

  formatSearchParams(filters: TableLazyLoadEvent['filters']) {
    const searchParams: any = {};

    for (const field in filters) {
      let filter = filters[field]!;
      if (Array.isArray(filter)) {
        filter = filter[0];
      }
      if (!filter.value) {
        continue;
      }

      searchParams[field] = { [filter.matchMode!]: filter.value }; // Format the value
    }
    return searchParams;
  }

  formatPagination(first: number, rows: number) {
    const newLimit = rows;
    let newPage = first / newLimit + 1;
    const previousLimit = parseInt(
      this.route.snapshot.queryParams['limit'],
      10
    );

    if (previousLimit != null && previousLimit !== newLimit) {
      newPage = 1;
    }

    return { page: newPage, limit: newLimit };
  }

  loadParcels() {
    const queryString = window.location.search;
    if (!queryString) return;

    this.loading = true;
    this.parcelsService.getParcels(queryString).subscribe((response) => {
      this.parcels = response.data;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  lazyLoad(event: TableLazyLoadEvent) {
    const search = this.formatSearchParams(event.filters);
    const pagination = this.formatPagination(event.first!, event.rows!);
    const query = qs.stringify({ ...search, ...pagination });

    this.router.navigateByUrl(`/parcels?${query}`);
  }

  clearFilters(table: Table) {
    table.clear();
  }

  openNewParcelModal() {
    this.dialogRef = this.dialogService.open(AddModalComponent, {
      header: 'Add a Parcel',
      width: '50vw',
      style: { 'max-width': '600px', 'min-width': '400px' },
    });

    this.dialogRef.onClose.subscribe((response) => {
      if (response.success) {
        this.loadParcels();
      }
    });
  }
}
