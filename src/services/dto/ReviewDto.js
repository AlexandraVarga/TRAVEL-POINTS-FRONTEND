export class ReviewDto {
    id;
    review;
    clientId;
    touristAttractionId;

    constructor(review, clientId, touristAttractionId) {
        this.review = review;
        this.clientId = clientId;
        this.touristAttractionId = touristAttractionId;
    }
}
