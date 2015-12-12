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
			var self = this;
			var url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=' + this.props.apiKey + '&callback=?';

			function getData() {
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
				});
			}

			getData();
	},

	render: function() {
		var self = this;
		var pictures = this.state.pictures.map(function(p){
			return <Picture ref={p.id} src={p.src} title={p.title}/>
		});

		return (
			<div>
			  <h1>Instagram Feed</h1>
			  <div className="pictures">{pictures}</div>
      </div>
		);
	}

});

React.render(<Gallery apiKey="d7e77013a923427dbeb49b0ce224296c" />, document.body);