(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const text = buffer.toString();
  console.log(text);
})()
