module ApplicationHelper
	def to_hashtag(string)
		"#"+string.split.map(&:capitalize).join("").gsub(/[^0-9A-Za-z]/, '')
	end
end
