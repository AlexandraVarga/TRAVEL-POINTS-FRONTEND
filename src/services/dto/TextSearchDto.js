export class TextSearchDto {
    filterKey;
    value;

    constructor(filterKey, filterValue) {
        this.filterKey = filterKey;
        this.value = filterValue;
    }
}