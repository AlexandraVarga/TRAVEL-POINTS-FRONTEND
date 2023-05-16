export class TouristAttractionDto {
    id;
    name;
    location;
    textDescription;
    nrOfVisits;
    entryPrice;
    discount;
    visitingDate;
    image;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.textDescription = data.textDescription;
        this.nrOfVisits = data.nrOfVisits;
        this.entryPrice = data.entryPrice;
        this.discount = data.discount;
        this.visitingDate = data.visitingDate;
        this.image = data.image;
    }
}