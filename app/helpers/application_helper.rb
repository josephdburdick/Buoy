module ApplicationHelper
	def to_hashtag(string)
		"#"+string.split.map(&:capitalize).join("")
	end
end
