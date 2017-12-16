module.exports = fn => (req, res) => {
  const end = res.end

  res.end = (chunk, ...rest) => {
    res.end = end
    let newChunk = chunk

    try {
      const obj = JSON.parse(chunk)
      if (typeof obj === 'object') {
        newChunk = JSON.stringify(obj, null, 2)
      }
    } catch (err) {
      if (typeof chunk !== 'string') {
        throw err
      }
    }

    return res.end(newChunk, ...rest)
  }

  return fn(req, res)
}
