var Picture = React.createClass({
	render: function(){
		return (
				<div className="picture">
					<img src={this.props.src}/>
				</div>
		);
	}
});

var Gallery = React.createClass({

  getInitialState: function(){
			return { 
				pictures: []
			};
	},

	componentDidMount: function(){
			this.getData();
	},

	getData: function() {
		console.log("shit");
		var self = this;
		var url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=' + this.props.apiKey + '&callback=?';
		$.getJSON(url, function(response){
			if(!response.data.length ){
				return;
			}

			var pictures = response.data.map(function(p){
				return { 
					id: p.id, 
					src: p.images.low_resolution.url
				};
			});
			self.setState({ 
				pictures: pictures
			});
			url = response.pagination.next_url;
		});
	},

	render: function() {
		var self = this;
		var pictures = this.state.pictures.map(function(p){
			return <Picture src={p.src}/>
		});

		return (
			<div>
			  <h1>Instagram Feed</h1>
			  <div className="pictures">
			  	<div className="load-more" onClick={this.getData}>load more</div>
			  		{pictures}
			  	<div className="load-more" onClick={this.getData}>load more</div>
			  </div> 
      </div>
		);
	}

});

React.render(<Gallery apiKey="d7e77013a923427dbeb49b0ce224296c" />, document.body);