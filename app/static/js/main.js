$(document).ready(function(){

	$('i.like').click(function(e) {
		/** allows the likeing system to work proprly*/ 
		e.stopPropagation();
		e.preventDefault();
		/** defines the variables like and image id*/
		var like = $(this).hasClass('far');
		var image_id = $(this).data('image');
		
		var _this = $(this);

		$.getJSON(
			/** idenfys what image your are likeing */
			$SCRIPT_ROOT + '/like',

			{
				like: like,
				image_id: image_id
			}, 
			function(result) {
				/** changes the aperinces of the heart so that it match whether or not it has been liked */
				if (like) {
					_this.removeClass('far');
					_this.addClass('fas');
				} else {
					_this.removeClass('fas');
					_this.addClass('far');
				}
				
			}
		);
	});
	/** Adds A gutter */
	var $grid = $('.grid').masonry({
		gutter: 30
	});
	/** allows you to select a filter */
	if ($('#filter-select').length > 0 ) {
		var filter = $('#filter-select').data('filter');
		$('#filter-select').val(filter);
	}
	/** allows you to select a filter */
	if ($('#category').length > 0 ) {
		var filter = $('#category').data('category');
		$('#category').val(filter);
	}

	$('.grid-item figure').click(function(){
		//Fetch image data
		var image_data = $(this).closest('.grid-item').data(image);
		var image = image_data.image;
	
		//Build HTML from image data
		var description = `<p>${image.description}</p>`;
		var title = `<h5 class="modal-title">${image.name}<i class="fa fa-times" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true"></i></h5>`;
		var img = `<img src="${image.upload_location}" alt="${image.name}" />`;
	
		//Add to modal and open modal
		$('#image-modal .modal-body').html(img + title + description);
		$('.modal').modal('show');
	});
});
